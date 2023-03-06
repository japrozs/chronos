import { MeQuery } from "@/generated/graphql";

export enum Providers {
    GOOGLE = "google",
    GITHUB = "github",
    // FIGMA = "figma",
}

export const getDisplayName = (provider: string): string => {
    switch (provider) {
        case Providers.GOOGLE:
            return "Google";
        case Providers.GITHUB:
            return "Github";
        // case Providers.FIGMA:
        //     return "Figma";
        default:
            return "Unknown";
    }
};

export const isProviderLinked = (user: MeQuery["me"], provider: string) => {
    let result: boolean;
    switch (provider) {
        case Providers.GOOGLE:
            result = user?.googleLinked || false;
            break;
        case Providers.GITHUB:
            result = user?.githubLinked || false;
            break;
        // case Providers.FIGMA:
        //     result = user?.figmaLinked || false;
        //     break;
        default:
            result = false;
    }
    return result;
};
