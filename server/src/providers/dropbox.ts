import { Application, Request, Response } from "express";
import { DROPBOX_REDIRECT_URI } from "../constants";

export const setupDropboxOAuth = (app: Application) => {
    // Getting login URL
    app.get("/auth/dropbox", (_: Request, res: Response) => {
        return res.json({ error: "dropbox oauth not yet implemented" });
    });

    // Getting the user from dropbox with the code
    app.get(`/${DROPBOX_REDIRECT_URI}`, async (_: Request, res: Response) => {
        res.json({ error: "dropbox oauth not yet implemented" });
    });
};
