import { Meta } from "@/components/shared/Meta";
import { Spinner } from "@/components/shared/Spinner";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { useLoginMutation, useMeQuery } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { useIsAuth } from "@/utils/useIsAuth";
import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface VerifyProps {}

const Verify: React.FC<VerifyProps> = ({}) => {
    useIsAuth();
    const { data, loading } = useMeQuery();
    const router = useRouter();
    return (
        <div>
            <Meta title="Chronos – Verify email" />
            {loading ? (
                <div className="flex h-screen w-screen items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <div className="h-screen">
                    <div className="px-6 py-5 z-10">
                        <a href="/">
                            <Image
                                src="/logo.svg"
                                className="h-8 w-auto"
                                height={20}
                                width={20}
                                alt="logo"
                            />
                        </a>
                    </div>
                    <div
                        style={{
                            marginTop: "13.8vh",
                        }}
                        className="max-w-lg ml-auto mr-auto  flex flex-col items-center justify-center"
                    >
                        <div className="flex items-center  mb-5">
                            <svg
                                viewBox="0 0 31 31"
                                className="w-10 text-primary-color h-auto mr-3"
                            >
                                <path
                                    d="M15.2782 30.6024C23.6224 30.6246 30.493 23.7805 30.5205 15.4364C30.548 7.10655 23.7082 0.225845 15.3784 0.203606C7.03419 0.181329 0.163558 7.02543 0.136099 15.3552C0.108593 23.6994 6.94836 30.5801 15.2782 30.6024ZM13.722 22.6136C13.0746 22.6119 12.572 22.3228 12.1135 21.7605L8.74592 17.7232C8.41636 17.3195 8.28807 16.9595 8.28944 16.5423C8.29238 15.6504 9.01403 14.9473 9.89161 14.9497C10.4095 14.9511 10.8117 15.1535 11.1986 15.615L13.6917 18.7147L19.3318 9.81007C19.7079 9.20683 20.1836 8.90598 20.7447 8.90748C21.6079 8.90978 22.3971 9.5449 22.3941 10.4369C22.393 10.7965 22.2478 11.1846 21.9876 11.5579L15.2786 21.7546C14.9027 22.3003 14.3406 22.6153 13.722 22.6136Z"
                                    fill="currentColor"
                                ></path>
                            </svg>
                            <p className="big_title text-5xl font-semibold">
                                Verify email
                            </p>
                        </div>
                        <p className="text-gray-500 text-md">
                            We just sent you an email at{" "}
                            <span className="menlo text-primary-color">
                                {data?.me?.email}
                            </span>{" "}
                            {router.query.code}
                            with a link in it so that you can verify that you
                            own that email. You will not be able to use Chronos
                            unless you verify that you are the owner of the
                            registered email account.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Verify;
