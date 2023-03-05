import Head from "next/head";
import React from "react";

interface MetaProps {
    title: string;
}

export const Meta: React.FC<MetaProps> = ({ title }) => {
    return (
        <Head>
            <meta
                name="description"
                content={"Spotlight search for all your cloud apps"}
            />
            <meta
                name="author"
                content={"Japroz Saini <sainijaproz@gmail.com>"}
            />
            <title>{title}</title>
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="../../../public/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="../../../public/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="../../../public/favicon-16x16.png"
            />
            <link rel="manifest" href="../../../public/site.webmanifest" />
            <link
                rel="mask-icon"
                href="../../../public/safari-pinned-tab.svg"
                color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="keywords" content={`Chronos, Search, Productivity`} />
            <meta name="og:title" content={title || "Chronos"} />
            <meta name="og:type" content={"chronos.search"} />
            <meta property="og:determiner" content="the" />
            <meta property="og:locale" content="en_GB" />
            <meta property="og:site_name" content="Chronos" />
            <meta
                name="og:description"
                content={"Spotlight search for all your cloud apps"}
            />
            <meta name="og:site_name" content="Chronos" />
            <meta name="og:image" content={`../../../public/banner_og.png`} />
            <meta property="og:image:alt" content="Chronos" />
        </Head>
    );
};
