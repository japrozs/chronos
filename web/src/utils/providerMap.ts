import { MeQuery } from "@/generated/graphql";

export enum Providers {
    GOOGLE = "google",
    GITHUB = "github",
}

export const getDisplayName = (provider: string): string => {
    switch (provider) {
        case Providers.GOOGLE:
            return "Google";
        case Providers.GITHUB:
            return "Github";
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
        default:
            result = false;
    }
    return result;
};
