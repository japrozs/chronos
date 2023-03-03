import axios from "axios";
import { Application, Request, Response } from "express";
import querystring from "querystring";
import { User } from "../entities/User";
import { GOOGLE_REDIRECT_URI } from "../constants";
import { File } from "src/schemas/File";

interface OAuthFields {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

interface OauthTokens {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    scope: string;
    id_token: string;
    error?: string;
}

export interface GoogleFileObject {
    kind: string;
    mimeType: string;
    createdTime: string;
    fileExtension: string;
    webViewLink: string;
    name: string;
    originalFilename: string;
}

export const parseGoogleFilesResult = (arr: File[], result_arr: any) => {
    for (const object in result_arr) {
        const resultObj = result_arr[object] as { files: GoogleFileObject[] };
        for (const item in resultObj.files) {
            arr.push({
                provider: "google",
                title:
                    resultObj.files[item].originalFilename ||
                    resultObj.files[item].name,
                createdAt: resultObj.files[item].createdTime,
                type: resultObj.files[item].mimeType,
                url: resultObj.files[item].webViewLink,
                extension: resultObj.files[item].fileExtension || "",
            });
        }
    }
};

export const getGoogleDriveFiles = async (token: string) => {
    console.log(
        `following https://www.googleapis.com/drive/v3/files?access_token=${token}`
    );
    return axios
        .get(
            // request only the fields we want from google's servers to reduce response time
            `https://www.googleapis.com/drive/v3/files?access_token=${token}&page_size=1000&fields=files(kind,createdTime,mimeType,fileExtension,webViewLink,originalFilename, name)`,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
        .then(async (res) => {
            const arr = [res.data];
            while (
                arr[arr.length - 1].nextLink &&
                arr[arr.length - 1].nextLink != ""
            ) {
                const object = arr[arr.length - 1];
                console.log("following ", object.nextLink);
                const result = await axios
                    .get(
                        `${object.nextLink}&access_token=${token}&page_size=1000&fields=files(kind,createdTime,mimeType,fileExtension,webViewLink,originalFilename, name)`,
                        {
                            headers: {
                                "Content-Type":
                                    "application/x-www-form-urlencoded",
                            },
                        }
                    )
                    .then((res) => res.data)
                    .catch((error: Error) => {
                        console.error(`Failed to fetch auth tokens`);
                        return { error: error.message };
                    });
                arr.push(result);
            }
            console.log("arr", arr.length);
            return arr;
        });
};

// construct a google oauth link
const genOAuthURI = () => {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
        redirect_uri: `http://localhost:4000/${GOOGLE_REDIRECT_URI}`,
        client_id: process.env.GOOGLE_CLIENT_ID,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: [
            "email",
            "profile",
            "https://www.googleapis.com/auth/drive.readonly",
        ].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
};

export const getGoogleAccessToken = async (
    refreshToken: string
): Promise<string> => {
    const config = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
    };
    // request for a new access token using the refresh token
    const result: OauthTokens = (
        await axios.post("https://www.googleapis.com/oauth2/v4/token", config, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).data;

    console.log(result);
    return result.access_token;
};

const getTokens = ({
    code,
    clientId,
    clientSecret,
    redirectUri,
}: OAuthFields): Promise<OauthTokens> => {
    const url = "https://oauth2.googleapis.com/token";
    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
    };

    return axios
        .post(url, querystring.stringify(values), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
        .then((res) => res.data)
        .catch((error: Error) => {
            console.error(`Failed to fetch auth tokens`);
            return { error: error.message };
        });
};

const initGoogleOAuth = (_: Request, res: Response) => {
    // generate the link for the google signup page and redirect there
    return res.redirect(genOAuthURI());
};

const googleOAuthCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const resultObj = await getTokens({
        code,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: `http://localhost:4000/${GOOGLE_REDIRECT_URI}`,
    });

    if (req.session.userId && !resultObj.error) {
        const user_before = await User.findOne(req.session.userId);
        await User.update(
            { id: req.session.userId },
            {
                googleRefreshToken: resultObj.refresh_token,
                google_linked: true,
                accountsLinked: user_before.accountsLinked + 1,
            }
        );
        const user = await User.findOne(req.session.userId);
        res.json(user);
    } else {
        res.json({ error: "req.session.userId is undefined" });
    }
};

export const setupGoogleOAuth = (app: Application) => {
    // Getting login URL
    app.get("/auth/google", (req: Request, res: Response) => {
        initGoogleOAuth(req, res);
    });

    // Getting the user from Google with the code
    app.get(`/${GOOGLE_REDIRECT_URI}`, async (req: Request, res: Response) => {
        googleOAuthCallback(req, res);
    });
};
