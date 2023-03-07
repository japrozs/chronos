import { parentPort } from "worker_threads";
import { getGithubRepos, parseGithubRepos } from "../providers/github";

parentPort?.on("message", async (token: string) => {
    const repos = await getGithubRepos(token);
    // const issues = await getGithubIssues(
    //     user.githubAccessToken,
    //     repos
    // );
    const result = parseGithubRepos(repos);
    parentPort?.postMessage(result);
});
