import { LOCAL_STORAGE_KEY } from "@/constants";
import { MeQuery } from "@/generated/graphql";
import { useStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlineRefresh } from "react-icons/hi";
import { SettingsModal } from "../modals/SettingsModal";
import { Button } from "../ui/Button";

interface NavbarProps {
    me: MeQuery["me"];
}

export const Navbar: React.FC<NavbarProps> = ({ me }) => {
    const { setFiles } = useStore();
    const router = useRouter();
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
                <div className="flex items-center ml-auto mr-0">
                    <Button
                        onClick={() => {
                            setFiles([]);
                            router.reload();
                        }}
                        className="px-2.5 py-2 mr-5 border-none text-text-compliment-color  hover:text-white hover:bg-dark-compliment-hovered"
                        label=""
                        icon={HiOutlineRefresh}
                    />
                    <SettingsModal me={me} />
                </div>
            </div>
        </div>
    );
};
