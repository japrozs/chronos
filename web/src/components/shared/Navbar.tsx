import { MeQuery } from "@/generated/graphql";
import Image from "next/image";
import React from "react";
import { SettingsModal } from "../modals/SettingsModal";

interface NavbarProps {
    me: MeQuery["me"];
}

export const Navbar: React.FC<NavbarProps> = ({ me }) => {
    return (
        <div
            style={{
                borderColor: "#161c2a",
            }}
            className="px-6 py-3 bg-black border-b  top-0 sticky"
        >
            <div className="flex items-center">
                <a href="/app">
                    <Image
                        priority={true}
                        src="/logo.svg"
                        className="h-8 w-auto"
                        height={20}
                        width={20}
                        alt="logo"
                    />
                </a>
                <div className="ml-auto mr-0">
                    <SettingsModal me={me} />
                </div>
            </div>
        </div>
    );
};
