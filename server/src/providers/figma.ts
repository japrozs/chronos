import { Application, Request, Response } from "express";
import { FIGMA_REDIRECT_URI } from "../constants";
import querystring from "querystring";
import axios from "axios";
import { User } from "../entities/User";
import { expressIsAuth } from "../middleware/isAuth";

interface OAuthFields {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

interface OAuthTokens {
    access_token: string;
    expires_in: Number;
    refresh_token: string;
    error?: string;
}

export const getFigmaFiles = async (token: string) => {};

export const getFigmaAccessToken = async (
    refreshToken: string
): Promise<string> => {
    const config = {
        client_id: process.env.FIGMA_CLIENT_ID,
        client_secret: process.env.FIGMA_CLIENT_SECRET,
        refresh_token: refreshToken,
    };

    const result: {
        access_token: string;
        expires: string;
    } = (
        await axios.post("https://www.figma.com/api/oauth/refresh", config, {
            headers: {
                "Content-Type": "application/json",
            },
        })
    ).data;

    console.log(result);
    return result.access_token;
};

const genOAuthURI = () => {
    const rootUrl = "https://www.figma.com/oauth";
    const options = {
        client_id: process.env.FIGMA_CLIENT_ID,
        redirect_uri: `http://localhost:4000/${FIGMA_REDIRECT_URI}`,
        scope: ["file_read"].join(" "),
        // be sure to match state in return obj
        state: "sdkfncsdfnskjnfsdknfdsf",
        response_type: "code",
    };
    return `${rootUrl}?${querystring.stringify(options)}`;
};

const initFigmaOAuth = (_: Request, res: Response) => {
    return res.redirect(genOAuthURI());
};

const getTokens = ({
    code,
    clientId,
    clientSecret,
    redirectUri,
}: OAuthFields): Promise<OAuthTokens> => {
    const url = "https://www.figma.com/api/oauth/token";
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

const figmaOAuthCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const resultObj = await getTokens({
        code,
        clientId: process.env.FIGMA_CLIENT_ID,
        clientSecret: process.env.FIGMA_CLIENT_SECRET,
        redirectUri: `http://localhost:4000/${FIGMA_REDIRECT_URI}`,
    });

    if (req.session.userId && !resultObj.error) {
        await User.update(
            { id: req.session.userId },
            {
                figmaRefreshToken: resultObj.refresh_token,
                figmaLinked: true,
            }
        );
        res.redirect("http://localhost:3000/settings");
    } else {
        res.redirect("http://localhost:3000/settings");
    }
};

export const setupFigmaOAuth = (app: Application) => {
    // Getting login URL
    app.get("/auth/figma", expressIsAuth, (req: Request, res: Response) => {
        initFigmaOAuth(req, res);
    });

    // Getting the user from Google with the code
    app.get(
        `/${FIGMA_REDIRECT_URI}`,
        expressIsAuth,
        async (req: Request, res: Response) => {
            figmaOAuthCallback(req, res);
        }
    );
};
