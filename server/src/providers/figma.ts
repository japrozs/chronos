import { Application, Request, Response } from "express";
import { FIGMA_REDIRECT_URI } from "../constants";

export const setupFigmaOAuth = (app: Application) => {
    // Getting login URL
    app.get("/auth/figma", (req: Request, res: Response) => {
        return res.json({ error: "figma oauth not yet implemented" });
    });

    // Getting the user from Google with the code
    app.get(`/${FIGMA_REDIRECT_URI}`, async (req: Request, res: Response) => {
        res.json({ error: "figma oauth not yet implemented" });
    });
};
