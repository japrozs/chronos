import { Meta } from "@/components/shared/Meta";
import { Navbar } from "@/components/shared/Navbar";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { ProviderCard } from "@/components/ui/ProviderCard";
import { useMeQuery } from "@/generated/graphql";
import { Providers } from "@/utils/providerMap";
import { useIsAuth } from "@/utils/useIsAuth";
import { Switch } from "@headlessui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
    useIsAuth();
    const { data, loading } = useMeQuery();
    return (
        <div>
            <Meta title="Chronos – Settings" />
            {loading ? (
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div className="min-h-screen">
                    <Navbar me={data?.me} />
                    <div className="mx-auto p-7 mid:p-10 max-w-3xl">
                        <div className="flex items-center mb-7">
                            <a href="/app">
                                <BiLeftArrowAlt className="text-3xl text-gray-400 cursor-pointer hover:text-primary-color mr-3" />
                            </a>
                            <p className="text-4xl global_title">Settings</p>
                        </div>
                        <Formik
                            initialValues={{
                                name: data?.me?.name,
                            }}
                            onSubmit={async (values, { setErrors }) => {
                                alert("updating profile");
                            }}
                        >
                            {({ isSubmitting, values: { name } }) => (
                                <Form>
                                    <InputField
                                        name="name"
                                        placeholder="Dwight Schrute"
                                        label="Name"
                                        fullWidth
                                    />
                                    <div
                                        className={
                                            "transition-all ml-auto mr-0 w-44 mt-5"
                                        }
                                    >
                                        <Button
                                            loading={isSubmitting}
                                            disabled={
                                                name?.trim() === data?.me?.name
                                            }
                                            type="submit"
                                            label="Update details"
                                            colored
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <label
                            className={
                                "text-sm text-text-compliment-color text-opacity-60"
                            }
                        >
                            Email (can't be changed)
                        </label>
                        <br />
                        <p
                            className={
                                "text-gray-300 transition-all text-smol placeholder-gray-600 py-1.5 px-3 mt-1.5 mb-1.5 bg-dark-compliment border border-gray-800 rounded-md outline-none focus:ring-2 focus:ring-border-blue-100"
                            }
                        >
                            {data?.me?.email}
                        </p>
                        <div className="mt-7">
                            <p className="global_title text-3xl mb-2">
                                Integrations
                            </p>
                            <p className="text-gray-600 font-medium text-smol mb-4">
                                Services that have been linked with your Chronos
                                account.
                            </p>
                            {Object.keys(Providers).map((provider, idx) => (
                                <ProviderCard
                                    key={idx}
                                    me={data?.me}
                                    provider={provider}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
