import { Meta } from "@/components/shared/Meta";
import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { useLoginMutation } from "@/generated/graphql";
import { toErrorMap } from "@/utils/toErrorMap";
import { useIsAuth } from "@/utils/useIsAuth";
import { useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    useIsAuth();
    const [loginMut] = useLoginMutation();
    const client = useApolloClient();
    const router = useRouter();
    return (
        <div>
            <Meta title="Chronos – Login" />
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
                    className="w-80 ml-auto mr-auto  flex flex-col items-center justify-center"
                >
                    <p className="text-5xl font-semibold mb-5">Log in</p>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        onSubmit={async (values, { setErrors }) => {
                            const response = await loginMut({
                                variables: values,
                            });
                            if (response.data?.login.errors) {
                                setErrors(
                                    toErrorMap(response.data.login.errors)
                                );
                            } else if (response.data?.login.user) {
                                if (!response.data.login.user.verified) {
                                    router.push("/verify");
                                } else if (
                                    typeof router.query.next === "string"
                                ) {
                                    router.push(router.query.next);
                                } else {
                                    // worked
                                    await client.resetStore();
                                    router.push("/app");
                                }
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <InputField
                                    name="email"
                                    placeholder="jim@dundermifflin.com"
                                    label="Email"
                                />
                                <InputField
                                    type="password"
                                    name="password"
                                    placeholder="that's what she said..."
                                    label="Password"
                                />
                                <Button
                                    loading={isSubmitting}
                                    type="submit"
                                    label="Log in"
                                    className="mt-5"
                                />
                            </Form>
                        )}
                    </Formik>
                    <p className="text-gray-600 text-smol mt-6">
                        Don't have an account?{" "}
                        <a
                            href="/signup"
                            className="underline hover:text-primary-color transition-all"
                        >
                            Sign up
                        </a>
                    </p>
                    <p className="text-gray-600 text-smol mt-2">
                        <a
                            href="/forgot-password"
                            className="underline hover:text-primary-color transition-all"
                        >
                            Forgot password?
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
