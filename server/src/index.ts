import "reflect-metadata";
import "dotenv-safe/config";
import { __prod__, COOKIE_NAME, VERIFICATION_CODE_LENGTH } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import crypto from "node:crypto";
import { User } from "./entities/User";
import path from "path";
import { UserResolver } from "./resolvers/user";
import { setupGoogleOAuth } from "./providers/google";
import { setupGithubOAuth } from "./providers/github";
import { setupFigmaOAuth } from "./providers/figma";
import { expressIsAuth } from "./middleware/isAuth";
import { setupDropboxOAuth } from "./providers/dropbox";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        synchronize: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        entities: [User],
    });
    await conn.runMigrations();
    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true,
        })
    );

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60, // 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                secure: false,
                domain: undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
    });

    // app.use("/upload/", avatarUpload);

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.get("/verify/:code", expressIsAuth, async (req, res) => {
        const code = req.params.code;
        const user: User = await User.findOne(req.session.userId);
        if (user.verificationCode === code) {
            await User.update(
                { id: req.session.userId },
                {
                    verified: true,
                }
            );
            return res.redirect("http://localhost:3000/app");
        }
        return res.redirect("http://localhost:3000/incorrect");
    });

    // setup all the providers
    setupGoogleOAuth(app);
    setupGithubOAuth(app);
    setupFigmaOAuth(app);
    setupDropboxOAuth(app);

    // setInterval(async () => {
    //     console.log("background job");
    // }, 1000 * 10); // every 10 seconds

    app.listen(parseInt(process.env.PORT), () => {
        console.log(`🚀 Server started on localhost:${process.env.PORT}`);
    });
};

main().catch((err: Error) => {
    console.error(err.message);
});
