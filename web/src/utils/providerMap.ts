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
