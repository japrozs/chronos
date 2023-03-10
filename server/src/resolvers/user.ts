import {
    Resolver,
    Mutation,
    Arg,
    Field,
    Ctx,
    ObjectType,
    Query,
    UseMiddleware,
} from "type-graphql";
import { Context } from "../types";
import { User } from "../entities/User";
import argon2 from "argon2";
import {
    COOKIE_NAME,
    FORGET_PASSWORD_PREFIX,
    VERIFICATION_CODE_LENGTH,
} from "../constants";
import { Worker } from "worker_threads";
import { UserInput } from "../schemas/UserInput";
import { validateRegister } from "../utils/validateRegister";
import { sendEmail } from "../utils/sendEmail";
import { v4 } from "uuid";
import { getConnection } from "typeorm";
import crypto from "node:crypto";
import { isAuth } from "../middleware/isAuth";
import {
    getGoogleAccessToken,
    getGoogleDriveFiles,
    parseGoogleFilesResult,
} from "../providers/google";
import { File } from "../schemas/File";
import {
    getGithubIssues,
    getGithubRepos,
    parseGithubIssues,
    parseGithubRepos,
} from "../providers/github";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { getFigmaAccessToken, getFigmaFiles } from "../providers/figma";
import path from "path";

@ObjectType()
export class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver(User)
export class UserResolver {
    @Mutation(() => UserResponse)
    async changePassword(
        @Arg("token") token: string,
        @Arg("newPassword") newPassword: string,
        @Ctx() { redis, req }: Context
    ): Promise<UserResponse> {
        if (newPassword.length <= 2) {
            return {
                errors: [
                    {
                        field: "newPassword",
                        message: "length must be greater than 2",
                    },
                ],
            };
        }

        const key = FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(key);
        if (!userId) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "token expired",
                    },
                ],
            };
        }

        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum, {
            relations: [],
        });

        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "user no longer exists",
                    },
                ],
            };
        }

        await User.update(
            { id: userIdNum },
            {
                password: await argon2.hash(newPassword),
            }
        );

        await redis.del(key);

        req.session.userId = user.id;

        return { user };
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg("email") email: string,
        @Ctx() { redis }: Context
    ) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return false;
        }

        const token = v4();

        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            "ex",
            1000 * 60 * 60 * 24 * 3
        ); // 3 days

        await sendEmail(
            email,
            `<a href="${process.env.CORS_ORIGIN}/changepass/${token}">reset password</a>`
        );

        return true;
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() { req }: Context) {
        // you are not logged in
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId, {
            relations: [],
        });
    }

    @UseMiddleware(isAuth)
    @Query(() => [File])
    async getFiles(@Ctx() { req }: Context) {
        const user: User = await User.findOne(req.session.userId);
        const promises: Promise<unknown>[] = [];
        let file_arr: File[] = [];
        if (user.googleLinked) {
            promises.push(
                new Promise(async (resolve) => {
                    // result from google drive
                    const token = await getGoogleAccessToken(
                        user.googleRefreshToken
                    );
                    const driveFiles = await getGoogleDriveFiles(token);
                    const worker = new Worker(
                        path.join(__dirname, "../workers/googleWorker.js")
                    );
                    worker.postMessage(driveFiles);
                    worker.on("message", (result) => {
                        file_arr.push(...result);
                    });
                    resolve(true);
                })
            );
        }
        if (user.githubLinked) {
            promises.push(
                new Promise(async (resolve) => {
                    const worker = new Worker(
                        path.join(__dirname, "../workers/githubWorker.js")
                    );
                    worker.postMessage(user.githubAccessToken);
                    worker.on("message", (result) => {
                        file_arr.push(...result);
                    });
                    resolve(true);
                })
            );
        }
        // if (user.figmaLinked) {
        //     promises.push(
        //         new Promise(async (resolve) => {
        //             const token = await getFigmaAccessToken(
        //                 user.figmaRefreshToken
        //             );
        //             await getFigmaFiles(token);
        //             resolve(true);
        //         })
        //     );
        // }
        console.log(file_arr);
        let results = await Promise.all(promises);
        console.log("Promise.all(promises) result :: ", results);
        // parseGithubIssues(file_arr, issues);
        return file_arr;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UserInput,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }

        const hashedPassword = await argon2.hash(options.password);
        let user;
        const code = crypto
            .randomBytes(VERIFICATION_CODE_LENGTH)
            .toString("hex");
        try {
            const result = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    name: options.name,
                    email: options.email,
                    password: hashedPassword,
                    verificationCode: code,
                })
                .returning("*")
                .execute();
            user = result.raw[0];
        } catch (err) {
            // duplicate username error
            if (err.code === "23505") {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "email already taken",
                        },
                    ],
                };
            }
        }

        req.session.userId = user.id;
        const us = await User.findOne(user.id, {
            relations: [],
        });

        sendEmail(
            us.email,
            `<a href="http://localhost:4000/verify/${code}">verify email</a>`
        );

        return { user: us };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { req }: Context
    ): Promise<UserResponse> {
        const user = await User.findOne({
            where: { email },
            relations: [],
        });
        if (!user) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "that account doesn't exist",
                    },
                ],
            };
        }
        const valid = await argon2.verify(user.password, password);
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "incorrect password",
                    },
                ],
            };
        }

        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: Context) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            })
        );
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateName(@Arg("name") name: string, @Ctx() { req }: Context) {
        await User.update(
            { id: req.session.userId },
            {
                name,
            }
        );
        return true;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async verifyUser(@Arg("code") code: string, @Ctx() { req }: Context) {
        const user: User = await User.findOne(req.session.userId);
        if (user.verificationCode === code) {
            await User.update(
                { id: req.session.userId },
                {
                    verified: true,
                }
            );
            return true;
        }
        return false;
    }

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async unlinkProvider(
        @Arg("provider") provider: string,
        @Ctx() { req }: Context
    ) {
        let key: string;
        switch (provider.toLowerCase()) {
            case "google":
                key = "googleLinked";
                break;
            case "github":
                key = "githubLinked";
                break;
            case "figma":
                key = "figmaLinked";
                break;
            case "dropbox":
                key = "dropboxLinked";
                break;
            default:
                key = "";
        }
        if (key === "") {
            return false;
        }

        await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({
                [key]: false,
            })
            .where("id = :id", { id: req.session.userId })
            .execute();
        return true;
    }
}
