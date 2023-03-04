import axios, { AxiosResponse } from "axios";
import { Application, Request, Response } from "express";
import querystring from "querystring";
import { User } from "../entities/User";
import { GITHUB_REDIRECT_URI } from "../constants";
import { File } from "../schemas/File";

const genOAuthURI = () => {
    const rootUrl = "https://github.com/login/oauth/authorize";
    const options = {
        redirect_uri: `http://localhost:4000/${GITHUB_REDIRECT_URI}`,
        client_id: process.env.GITHUB_CLIENT_ID,
        // check that the `state` matches with the response as well
        state: "jadnfcndsfkjnsfjnsj",
        scope: ["repo"].join(" "),
    };

    return `${rootUrl}?${querystring.stringify(options)}`;
};

interface OAuthFields {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
}

interface OAuthToken {
    access_token: string;
    token_type: string;
    scope: string;
}

export const getGithubRepos = async (token: string) => {
    const reposUrl = (
        await axios
            .get("https://api.github.com/user", {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
            .catch((err: Error) => {
                console.error(`Failed to fetch user info`);
            })
    ).repos_url;

    const resObject: AxiosResponse = (await axios
        .get(`${reposUrl}?per_page=1000`, {
            headers: {
                Accept: "application/vnd.github+json",
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            console.log("headers :: ", res.headers);
            return res;
        })
        .catch((err: Error) => {
            console.error(`Failed to fetch user repos`);
        })) as AxiosResponse;

    const arr = [...resObject.data];

    let link: string = resObject.headers.link.split(">")[0];
    link = link.substring(1, link.length);
    while (!link.endsWith("&page=1")) {
        const data = (await axios
            .get(link, {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                return res;
            })
            .catch((err: Error) => {
                console.error(`Failed to fetch user repos`);
            })) as AxiosResponse;
        link = data.headers.link.split(">")[0];
        arr.push(...data.data);
    }

    return arr;
};

export const getGithubIssues = async (
    token: string,
    repos: { issues_url: string; has_issues: boolean }[]
) => {
    const arr = [];
    for (let i = 0; i < repos.length; i++) {
        if (!repos[i].has_issues) {
            continue;
        }
        console.log(
            "repos[i].issues_url :: ",
            repos[i].issues_url.split("{")[0]
        );
        const issues = await axios
            // repos_url -> https://api.github.com/repos/japrozs/able/issues{/number}
            .get(repos[i].issues_url.split("{")[0], {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.data)
            .catch((err: Error) => {
                console.error(`Failed to fetch user repos`);
            });
        arr.push(...issues);
    }
    return arr;
};

export const parseGithubRepos = (
    arr: File[],
    repos: {
        name: string;
        html_url: string;
        created_at: string;
        default_branch: string;
    }[]
) => {
    for (let i = 0; i < repos.length; ++i) {
        console.log("repo :: ", repos[i].name);
        arr.push({
            provider: "github",
            type: "github_repo",
            url: repos[i].html_url,
            title: repos[i].name,
            kind: "Repository",
            createdAt: repos[i].created_at,
            extension: repos[i].default_branch,
        });
    }
};

export const parseGithubIssues = (
    arr: File[],
    issues: {
        title: string;
        html_url: string;
        created_at: string;
        state: string;
    }[]
) => {
    for (let i = 0; i < issues.length; ++i) {
        arr.push({
            provider: "github",
            type: "github_repo",
            url: issues[i].html_url,
            kind: "Issue",
            title: issues[i].title,
            createdAt: issues[i].created_at,
            extension: issues[i].state === "open" ? "open" : "closed",
        });
    }
};

const getTokens = ({
    code,
    clientId,
    clientSecret,
    redirectUri,
}: OAuthFields): Promise<string> => {
    const url = "https://github.com/login/oauth/access_token";
    const values = {
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
    };

    return axios
        .post(url, values, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.data)
        .catch((error: Error) => {
            console.error(`Failed to fetch auth tokens`);
            return { error: error.message };
        });
};

const initGithubOAuth = (_: Request, res: Response) => {
    return res.redirect(genOAuthURI());
};

const githubOAuthCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const resultObj: OAuthToken = querystring.parse(
        await getTokens({
            code,
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            redirectUri: `http://localhost:4000/${GITHUB_REDIRECT_URI}`,
        })
    ) as unknown as OAuthToken;
    if (!resultObj.access_token) {
        // broken
        return res.redirect("http://localhost:3000/settings");
    }

    if (req.session.userId) {
        await User.update(
            { id: req.session.userId },
            {
                githubAccessToken: resultObj.access_token,
                githubLinked: true,
            }
        );
        res.redirect("http://localhost:3000/settings");
    } else {
        res.redirect("http://localhost:3000/settings");
    }
};

export const setupGithubOAuth = (app: Application) => {
    // Getting login URL
    app.get("/auth/github", (req: Request, res: Response) => {
        initGithubOAuth(req, res);
    });

    // Getting the user from Google with the code
    app.get(`/${GITHUB_REDIRECT_URI}`, async (req: Request, res: Response) => {
        githubOAuthCallback(req, res);
    });
};
