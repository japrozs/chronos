import { Button } from "@/components/ui/Button";
import { InputField } from "@/components/ui/InputField";
import { useIsAuth } from "@/utils/useIsAuth";
import { Form, Formik } from "formik";
import Image from "next/image";
import React from "react";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    useIsAuth();
    return (
        <div>
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
                            console.log("submitting login form...");
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
