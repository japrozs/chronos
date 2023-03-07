import axios from "axios";
import { Application, Request, Response } from "express";
import querystring from "querystring";
import { expressIsAuth } from "../middleware/isAuth";
import { DROPBOX_REDIRECT_URI } from "../constants";
import { User } from "../entities/User";

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
    scope: string;
    token_type: string;
    account_id: string;
    uid: Number;
    error?: string;
}

const genOAuthURI = () => {
    const rootUrl = "https://www.dropbox.com/oauth2/authorize";
    const options = {
        client_id: process.env.DROPBOX_CLIENT_ID,
        token_access_type: "offline",
        redirect_uri: `http://localhost:4000/${DROPBOX_REDIRECT_URI}`,
        response_type: "code",
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
};

const initDropboxOAuth = (_: Request, res: Response) => {
    return res.redirect(genOAuthURI());
};

const getTokens = ({
    code,
    clientId,
    clientSecret,
    redirectUri,
}: OAuthFields): Promise<OAuthTokens> => {
    const url = "https://api.dropbox.com/oauth2/token";
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

const dropboxOAuthCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const resultObj = await getTokens({
        code,
        clientId: process.env.DROPBOX_CLIENT_ID,
        clientSecret: process.env.DROPBOX_CLIENT_SECRET,
        redirectUri: `http://localhost:4000/${DROPBOX_REDIRECT_URI}`,
    });

    if (req.session.userId && !resultObj.error) {
        await User.update(
            { id: req.session.userId },
            {
                dropboxRefreshToken: resultObj.refresh_token,
                dropboxLinked: true,
            }
        );
        res.redirect("http://localhost:3000/settings");
    } else {
        res.redirect("http://localhost:3000/settings");
    }
};

export const setupDropboxOAuth = (app: Application) => {
    // Getting login URL
    app.get("/auth/dropbox", expressIsAuth, (req: Request, res: Response) => {
        initDropboxOAuth(req, res);
    });

    // Getting the user from dropbox with the code
    app.get(
        `/${DROPBOX_REDIRECT_URI}`,
        expressIsAuth,
        async (req: Request, res: Response) => {
            dropboxOAuthCallback(req, res);
        }
    );
};
