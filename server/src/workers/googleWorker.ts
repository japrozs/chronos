import { parseGoogleFilesResult } from "../providers/google";
import { parentPort } from "worker_threads";

parentPort?.on("message", async (result_arr: any) => {
    const result = await parseGoogleFilesResult(result_arr);
    parentPort?.postMessage(result);
});
