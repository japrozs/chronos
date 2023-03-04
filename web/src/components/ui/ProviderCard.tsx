import { MeQuery, useUnlinkProviderMutation } from "@/generated/graphql";
import {
    getDisplayName,
    isProviderLinked,
    Providers as _Providers,
} from "@/utils/providerMap";
import { useApolloClient } from "@apollo/client";
import { Switch } from "@headlessui/react";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";

interface ProviderCardProps {
    provider: string;
    me: MeQuery["me"];
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, me }) => {
    const Providers = _Providers as Record<string, string>;
    const [unlinkProvider] = useUnlinkProviderMutation();
    const client = useApolloClient();
    const router = useRouter();
    const [enabled, setEnabled] = useState(
        isProviderLinked(me, Providers[provider])
    );
    return (
        <div className="flex items-center p-4 my-3 rounded-md hover:bg-dark-compliment-hovered transition-all cursor-pointer duration-[80ms]">
            <Image
                className="w-10 h-10"
                src={`/providers/${provider}.svg`}
                alt=""
                width={10}
                height={10}
            />
            <div className="ml-7 w-full mr-6  truncate">
                <p className="text-lg font-medium  truncate ">
                    {getDisplayName(Providers[provider])}
                </p>
            </div>
            <div className="text-right">
                <Switch
                    checked={enabled}
                    onChange={async (checked) => {
                        if (checked) {
                            router.push(
                                `http://localhost:4000/auth/${Providers[provider]}`
                            );
                        } else {
                            const response = await unlinkProvider({
                                variables: {
                                    provider: Providers[provider],
                                },
                            });
                        }
                        await client.resetStore();
                        setEnabled(checked);
                    }}
                    className={`${
                        enabled
                            ? "bg-primary-color"
                            : "bg-dark-compliment-hovered border border-gray-700"
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                    <span
                        className={`${
                            enabled ? "translate-x-6" : "translate-x-1"
                        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
            </div>
        </div>
    );
};
