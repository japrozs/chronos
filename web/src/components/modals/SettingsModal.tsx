import {
    MeQuery,
    MeQueryResult,
    RegularUserFragment,
    useLogoutMutation,
} from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineSettings, MdExitToApp } from "react-icons/md";
import { Button } from "../ui/Button";

interface SettingsModalProps {
    me: MeQuery["me"];
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ me }) => {
    const [logout] = useLogoutMutation();
    const client = useApolloClient();
    const router = useRouter();

    const logUserOut = async () => {
        await logout();
        router.push("/");
        await client.resetStore();
    };

    return (
        <Menu>
            <Menu.Button as="div">
                <Button
                    className="px-2.5 py-2 border-none text-text-compliment-color  hover:text-white hover:bg-dark-compliment-hovered"
                    label=""
                    icon={BsThreeDots}
                />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-20 mt-2 origin-top border border-gray-800 bg-dark-compliment-hovered rounded-md shadow-lg mr-2 w-60 ">
                    <div className="py-2">
                        <div className="flex items-center mb-1">
                            <p className="px-2 text-xs menlo text-primary-color">
                                {me?.email}
                            </p>
                        </div>
                        <div className="flex items-center py-1 border-b border-gray-800">
                            <div className="w-full">
                                <p className="w-full ml-3 text-base font-medium text-gray-300 ">
                                    {me?.name}
                                </p>

                                <p className="ml-3 text-xs text-gray-500 ">
                                    Standard Plan
                                </p>
                            </div>
                        </div>
                        <a href="/settings">
                            <div className="flex items-center px-3 py-2 pb-2 pt-2 text-gray-300 hover:bg-dark-compliment cursor-pointer">
                                <MdOutlineSettings className="text-lg mr-2" />
                                <p className="text-sm font-medium ">Settings</p>
                            </div>
                        </a>
                        <div
                            onClick={logUserOut}
                            className="flex items-center px-3 py-2 pb-2 pt-2 text-red-500 hover:bg-dark-compliment cursor-pointer"
                        >
                            <MdExitToApp className="text-lg mr-2" />
                            <p className="text-sm font-medium ">Log out</p>
                        </div>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};
