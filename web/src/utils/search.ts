import { RegularFileFragment } from "@/generated/graphql";

export interface SearchResult {
    time: number; // in milliseconds
    results: RegularFileFragment[];
}

export const search = (
    query: string,
    files: RegularFileFragment[]
): SearchResult => {
    const start = Date.now();
    const results = files.filter((file) => {
        return file.title
            .trim()
            .split(" ")
            .join("")
            .toLowerCase()
            .includes(query.trim().split(" ").join("").toLowerCase());
    });
    const timeTaken = Date.now() - start;
    return {
        time: timeTaken,
        results,
    };
};
