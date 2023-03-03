import { RegularFileFragment } from "@/generated/graphql";
import { getDisplayName, Providers } from "@/utils/providerMap";
import Image from "next/image";
import React from "react";

interface ResultCardProps {
    file: RegularFileFragment;
}

export const ResultCard: React.FC<ResultCardProps> = ({ file }) => {
    return (
        <a href={file.url} target="_blank">
            <div className="flex items-center p-4 my-3 rounded-md hover:bg-dark-compliment-hovered transition-all cursor-pointer duration-[80ms]">
                <Image
                    className="w-16 h-16"
                    src={`/providers/${file.provider}.svg`}
                    alt=""
                    width={10}
                    height={10}
                />
                <div className="ml-7 w-full mr-6  truncate">
                    <p className="text-lg font-medium  truncate ">
                        {file.title}
                    </p>
                    <p className="mt-1 text-gray-500">
                        {getDisplayName(file.provider)} – {file.kind}
                    </p>
                </div>
                <div className="text-right">
                    {file.extension != "" ? (
                        <p
                            className={`ml-auto mr-0 py-0.5 font-medium ${
                                file.provider === Providers.GITHUB
                                    ? "menlo"
                                    : "menlo uppercase"
                            } px-1.5 text-smol rounded-md w-fit text-gray-300 bg-gray-700 self-start`}
                        >
                            {file.extension}
                        </p>
                    ) : (
                        <p className="text-primary-color  self-start menlo cursor-pointer hover:underline">
                            {new URL(file.url).hostname}
                        </p>
                    )}
                    <p className="w-max mt-2 ml-auto mr-0 hidden md:block text-gray-500">
                        {new Date(file.createdAt).toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}
                    </p>
                </div>
            </div>
        </a>
    );
};
