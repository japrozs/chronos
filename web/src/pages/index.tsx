import { Banner } from "@/components/shared/Banner";
import { Footer } from "@/components/shared/Footer";
import { Meta } from "@/components/shared/Meta";
import { Button } from "@/components/ui/Button";
import { useIsAuth } from "@/utils/useIsAuth";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Home() {
    useIsAuth();
    return (
        <>
            <Meta title="Chronos – Spotlight search for all your cloud apps" />
            <Banner />
            <div
                style={{
                    borderColor: "#161c2a",
                }}
                className="px-6 py-3 bg-black border-b "
            >
                <div className="flex items-center">
                    <Image
                        src="/logo.svg"
                        className="h-8 w-auto"
                        height={20}
                        width={20}
                        alt="logo"
                    />
                    <div className="hidden md:flex ml-auto mr-0 items-center">
                        <div className="w-24">
                            <a href="/login">
                                <Button
                                    label="Login"
                                    className="border-none py-1.5"
                                />
                            </a>
                        </div>
                        <div className="w-40 ml-3">
                            <a href="/signup">
                                <Button label="Get Chronos free" colored />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-screen text-center flex flex-col items-center justify-center">
                <div className="image_gradient_parent">
                    <div className="image_gradient_layer"></div>
                    <img
                        className="transition-all mt-6 h-48 md:h-60 lg:h-90 w-auto rounded-lg m-5"
                        src="/images/screenshot.png"
                    />
                </div>
                <p className="global_title z-10 transition-all text-5xl md:text-7xl font-semibold md:-mt-10 lg:-mt-20">
                    Spotlight search
                    <br />
                    <span className="bg-gradient-to-r from-blue-500  via-pink-500 to-red-500 inline-block text-transparent bg-clip-text pb-3">
                        across all your apps
                    </span>
                </p>
                <p className="max-w-xl mx-auto mt-2 text-text-compliment-color text-opacity-60 text-lg">
                    Chronos is a tool to help you find and sort through your
                    documents that are scattered across different apps and
                    storage clouds
                </p>
                <div className="w-52 mt-5 mx-auto">
                    <a href="/signup">
                        <Button
                            colored
                            label="Get Chronos for free"
                            icon={BiRightArrowAlt}
                        />
                    </a>
                </div>
            </div>
            <div
                style={{
                    background: 'url("/images/scribbles.png")',
                }}
                className="p-10 my-16 flex flex-col-reverse mid:flex-row items-center"
            >
                <div className="w-full p-3">
                    <div className="flex items-center">
                        <svg
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-10 text-green-500 h-auto mr-3"
                        >
                            <path
                                d="M10.25 5.75s-2.385 2.54-3 4.5l-1.5-1.5m8.5-.75a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                        <p className="big_title text-3xl mid:text-5xl">
                            Enable and{" "}
                            <span className="text-green-500"> Go</span>
                        </p>
                    </div>
                    <p className="shadow pt-3 text-lg text-gray-300 mid:pr-10">
                        All it takes is one click to connect your account to
                        Chronos and you are good to go. We always only ask for
                        read-access to your accounts.
                    </p>
                </div>
                <div className="w-full shadow">
                    <img
                        className="transition-all mb-6 md:mb-0 w-full h-auto rounded-lg"
                        src="/images/integrations.png"
                    />
                </div>
            </div>
            <div className="my-20">
                <p className="text-center title mb-7">
                    <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 inline-block text-transparent bg-clip-text">
                        Simple,
                    </span>{" "}
                    yet{" "}
                    <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 inline-block text-transparent bg-clip-text">
                        powerful
                    </span>{" "}
                </p>
                <p className="text-center lora shadow pt-3 mx-auto mid:max-w-3xl text-xl mid:text-2xl text-gray-100">
                    "Chronos has been amazing to use for finding files in my
                    messy Google Drive, OneDrive and Dropbox accounts"
                </p>
                <div className="mt-5 flex items-center">
                    <div className="ml-auto mr-2.5">
                        <img
                            className="shadow-lg"
                            src="https://www.notion.so/cdn-cgi/image/format=auto,width=128,quality=100/front-static/shared/logos/color/metalab.png"
                        />
                    </div>
                    <p className="text-left text-tiny mr-auto ml-2.5">
                        <span className="font-medium">John Doe</span>
                        <br />
                        <span>Founder and CEO, ACME Inc.</span>
                    </p>
                </div>
            </div>
            <div className="mx-auto max-w-5xl">
                <div className="bg-dark-compliment-hovered rounded-md p-5 mb-2.5 m-5">
                    <div className="flex flex-col mid:flex-row items-center">
                        <div className="w-full p-10">
                            <img
                                className="w-full h-auto"
                                src="/images/hands.svg"
                            />
                        </div>
                        <div className="w-full mid:p-5 mid:pl-8">
                            <svg
                                className="w-7 h-auto text-primary-color mb-3"
                                width="106"
                                height="101"
                                viewBox="0 0 106 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M38.9345 1.13307C32.1345 2.73307 26.6679 5.6664 18.4012 12.1997C11.3345 17.6664 9.6012 21.3997 12.9345 24.7331C15.2012 26.9997 13.3345 28.0664 10.0012 26.3331C7.73453 25.1331 6.53453 25.2664 3.86786 26.9997C0.267862 29.2664 0.00119587 30.5997 2.13453 34.7331C4.0012 38.3331 11.4679 46.3331 12.9345 46.3331C13.4679 46.3331 15.2012 45.1331 16.6679 43.6664C18.6679 41.6664 19.0679 40.0664 18.4012 36.8664L17.6012 32.7331L21.2012 34.9997C23.2012 36.3331 26.8012 37.3997 29.0679 37.2664C32.8012 37.1331 34.1345 38.1997 40.4012 46.3331L47.3345 55.5331L39.0679 63.2664C12.9345 87.6664 13.3345 87.1331 14.6679 91.1331C15.4679 93.1331 18.0012 96.0664 20.5345 97.5331L25.0679 100.066L31.2012 93.5331C34.5345 89.9331 41.6012 82.3331 46.6679 76.7331L56.0012 66.3331L69.0679 82.9997C78.0012 94.4664 82.9345 99.6664 84.8012 99.6664C88.0012 99.6664 94.4012 93.6664 93.7345 91.1331C93.4679 90.0664 86.8012 81.9331 78.9345 73.1331L64.4012 56.9997L71.4679 49.2664L78.4012 41.6664L85.3345 42.0664C97.7345 42.8664 106.001 35.6664 106.001 23.9331C106.001 17.3997 104.935 16.9997 97.3345 21.6664C92.5345 24.5997 91.8679 24.7331 89.7345 22.7331C87.4679 20.7331 87.6012 20.3331 92.0012 15.3997C97.3345 9.6664 97.2012 8.33307 91.3345 6.99973C85.6012 5.6664 78.8012 8.4664 73.8679 13.9331C70.0012 18.4664 69.7345 19.2664 70.2679 26.5997L70.8012 34.4664L63.6012 41.1331L56.2679 47.7997L48.0012 38.7331C40.9345 30.9997 39.8679 29.2664 40.8012 26.7331C41.4679 24.9997 41.6012 22.8664 41.2012 21.7997C40.8012 20.5997 43.4679 17.6664 48.6679 13.6664C57.2012 7.13307 58.6679 2.19973 50.2679 8.4664C41.0679 15.2664 38.0012 18.7331 38.0012 22.3331C38.0012 25.9331 34.4012 30.0664 29.2012 32.7331C25.6012 34.5997 22.5345 32.5997 17.3345 24.9997L13.4679 19.5331L17.4679 16.1997C19.6012 14.4664 25.2012 10.9997 30.0012 8.73307C37.4679 4.8664 40.0012 4.33307 48.9345 4.19973C59.4679 4.19973 63.2012 2.33307 56.0012 0.866401C50.4012 -0.333599 44.8012 -0.200266 38.9345 1.13307ZM91.3345 10.3331C91.3345 10.9997 89.8679 13.7997 88.0012 16.4664L84.5345 21.5331L87.8679 24.8664L91.2012 28.1997L96.2679 25.6664C99.0679 24.1997 101.868 22.8664 102.535 22.4664C104.801 21.5331 102.001 30.8664 99.2012 33.7997C92.4012 40.9997 82.0012 41.2664 76.1345 34.1997C70.0012 26.8664 72.5345 15.3997 81.2012 11.1331C85.8679 8.73307 91.3345 8.33307 91.3345 10.3331ZM9.46786 29.1331C9.86786 29.9331 11.7345 30.3331 13.4679 29.9331C17.2012 29.2664 19.0679 31.1331 16.8012 33.3997C16.0012 34.1997 15.3345 36.1997 15.3345 37.7997C15.3345 42.0664 12.9345 42.9997 9.73453 40.1997C5.46786 36.1997 3.2012 30.9997 5.06786 29.1331C6.93453 27.2664 8.26786 27.2664 9.46786 29.1331ZM69.8679 47.2664C67.2012 50.0664 56.2679 62.0664 45.3345 74.0664C34.5345 85.9331 25.0679 95.6664 24.2679 95.6664C22.2679 95.6664 16.6679 90.1997 16.8012 88.4664C16.8012 87.6664 28.9345 76.0664 43.7345 62.7331C67.3345 41.5331 70.9345 38.7331 72.6679 40.3331C74.2679 42.0664 74.0012 42.9997 69.8679 47.2664Z"
                                    fill="#007AFF"
                                />
                                <path
                                    d="M20.668 89.668C20.668 90.7346 21.6013 91.668 22.668 91.668C23.7346 91.668 24.668 90.7346 24.668 89.668C24.668 88.6013 23.7346 87.668 22.668 87.668C21.6013 87.668 20.668 88.6013 20.668 89.668Z"
                                    fill="#007AFF"
                                />
                            </svg>

                            <p className="text-3xl mb-2 global_title">
                                Improve the tool
                            </p>
                            <p className="text text-gray-400">
                                We listen to our community and build Chronos in
                                collaboration with developers, to build the best
                                product and developer experience across the app.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col mid:flex-row items-start mx-5 mid:mx-0 justify-center">
                    <div className="w-full h-full bg-dark-compliment-hovered rounded-md p-5 mid:mr-2.5 mid:mt-2.5 mid:m-5">
                        <svg
                            viewBox="0 0 26 21"
                            className="w-6 h-auto text-primary-color mb-3"
                        >
                            <path
                                d="M0.239258 16.4927C0.239258 16.8006 0.34668 17.0584 0.561523 17.2661C0.783529 17.4666 1.05924 17.5669 1.38867 17.5669H3.91309C4.83691 17.5669 5.60677 17.4129 6.22266 17.105C6.8457 16.797 7.47591 16.2707 8.11328 15.5259L14.7197 7.68408C15.0348 7.31169 15.3356 7.01807 15.6221 6.80322C15.9157 6.58122 16.2236 6.42367 16.5459 6.33057C16.8753 6.23031 17.2477 6.18018 17.6631 6.18018H19.8115V8.54346C19.8115 8.80127 19.8831 9.00537 20.0264 9.15576C20.1696 9.29899 20.3737 9.37061 20.6387 9.37061C20.7604 9.37061 20.875 9.34912 20.9824 9.30615C21.0898 9.26318 21.1865 9.20589 21.2725 9.13428L25.4941 5.62158C25.6875 5.44971 25.7842 5.24919 25.7842 5.02002C25.7842 4.79085 25.6875 4.59033 25.4941 4.41846L21.2725 0.89502C21.1865 0.823405 21.0898 0.769694 20.9824 0.733887C20.875 0.690918 20.7604 0.669434 20.6387 0.669434C20.3737 0.669434 20.1696 0.741048 20.0264 0.884277C19.8831 1.02751 19.8115 1.22803 19.8115 1.48584V4.03174H17.6738C16.7214 4.03174 15.9121 4.18929 15.2461 4.50439C14.5801 4.81234 13.9033 5.37451 13.2158 6.19092L6.72754 13.9038C6.26921 14.4552 5.82161 14.8455 5.38477 15.0747C4.94792 15.3039 4.43229 15.4185 3.83789 15.4185H1.38867C1.05924 15.4185 0.783529 15.5223 0.561523 15.73C0.34668 15.9305 0.239258 16.1847 0.239258 16.4927ZM0.239258 5.10596C0.239258 5.42106 0.34668 5.67887 0.561523 5.87939C0.783529 6.07992 1.05924 6.18018 1.38867 6.18018H3.77344C4.36784 6.18018 4.89421 6.29476 5.35254 6.52393C5.81087 6.75309 6.26921 7.14339 6.72754 7.69482L13.2803 15.4829C13.932 16.2563 14.5944 16.797 15.2676 17.105C15.9408 17.4129 16.7393 17.5669 17.6631 17.5669H19.8115V20.1558C19.8115 20.4136 19.8831 20.6141 20.0264 20.7573C20.1696 20.9006 20.3737 20.9722 20.6387 20.9722C20.7604 20.9722 20.875 20.9507 20.9824 20.9077C21.0898 20.8719 21.1865 20.8182 21.2725 20.7466L25.4941 17.2339C25.6875 17.062 25.7842 16.8615 25.7842 16.6323C25.7842 16.4032 25.6875 16.2026 25.4941 16.0308L21.2725 12.5073C21.1865 12.4357 21.0898 12.3784 20.9824 12.3354C20.875 12.2925 20.7604 12.271 20.6387 12.271C20.3737 12.271 20.1696 12.3462 20.0264 12.4966C19.8831 12.6398 19.8115 12.8403 19.8115 13.0981V15.4185H17.7168C17.0866 15.4185 16.5423 15.3039 16.084 15.0747C15.6328 14.8455 15.1745 14.4552 14.709 13.9038L8.11328 6.07275C7.47591 5.3208 6.83496 4.79443 6.19043 4.49365C5.55306 4.18571 4.77246 4.03174 3.84863 4.03174H1.38867C1.05924 4.03174 0.783529 4.132 0.561523 4.33252C0.34668 4.53304 0.239258 4.79085 0.239258 5.10596Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <p className="text-3xl mb-2 global_title">
                            Near instant search
                        </p>
                        <p className="text text-gray-400">
                            Chronos indexes your cloud apps within 5 seconds, so
                            you can have a seamless experience with quick
                            results.
                        </p>
                    </div>
                    <div className="w-full h-auto bg-dark-compliment-hovered rounded-md p-5 mt-2.5 mid:mt-2.5 mid:ml-2.5 mid:m-5">
                        <svg
                            viewBox="0 0 30 20"
                            className="w-6 h-auto text-primary-color mb-3"
                        >
                            <path
                                d="M14.951 19.558c1.468 0 2.85-.176 4.147-.527a17.635 17.635 0 0 0 3.598-1.386 18.18 18.18 0 0 0 2.933-1.912 17.422 17.422 0 0 0 2.213-2.084c.609-.701 1.07-1.35 1.386-1.944.322-.601.483-1.085.483-1.45s-.161-.845-.483-1.44c-.316-.594-.777-1.238-1.386-1.933a16.965 16.965 0 0 0-2.213-2.095 17.491 17.491 0 0 0-2.944-1.901 17.305 17.305 0 0 0-3.587-1.397A15.811 15.811 0 0 0 14.95.963c-1.44 0-2.807.175-4.103.526-1.29.351-2.482.817-3.577 1.397a18.517 18.517 0 0 0-2.955 1.901 17.222 17.222 0 0 0-2.234 2.095C1.473 7.577 1.004 8.22.675 8.815.353 9.41.19 9.89.19 10.255s.162.848.484 1.45c.33.595.798 1.243 1.407 1.944.616.695 1.357 1.39 2.224 2.084a19.063 19.063 0 0 0 2.954 1.912 17.763 17.763 0 0 0 3.577 1.386c1.296.351 2.668.527 4.114.527Zm0-2.074c-1.146 0-2.245-.14-3.298-.419a15.067 15.067 0 0 1-2.943-1.117 18.12 18.12 0 0 1-2.492-1.514A17.64 17.64 0 0 1 4.306 12.8c-.537-.544-.953-1.042-1.246-1.493-.287-.452-.43-.803-.43-1.053 0-.208.143-.526.43-.956.293-.43.709-.917 1.246-1.461A16.957 16.957 0 0 1 8.71 4.626a15.17 15.17 0 0 1 2.943-1.16 12.219 12.219 0 0 1 3.298-.44c1.146 0 2.242.146 3.287.44 1.046.293 2.027.68 2.944 1.16.916.473 1.747.988 2.492 1.547a16.508 16.508 0 0 1 1.923 1.665c.537.544.949 1.031 1.235 1.46.294.43.44.75.44.957 0 .25-.146.601-.44 1.053-.286.45-.698.949-1.235 1.493a17.151 17.151 0 0 1-4.415 3.147c-.917.466-1.898.838-2.944 1.117-1.045.28-2.141.42-3.287.42Zm.01-1.44a5.64 5.64 0 0 0 2.246-.45 5.992 5.992 0 0 0 1.848-1.257 6.007 6.007 0 0 0 1.246-1.848c.3-.702.451-1.446.451-2.234a5.715 5.715 0 0 0-1.697-4.093 5.694 5.694 0 0 0-1.848-1.235 5.639 5.639 0 0 0-2.245-.451 5.72 5.72 0 0 0-2.277.45 5.694 5.694 0 0 0-1.848 1.236A5.715 5.715 0 0 0 9.59 8a5.785 5.785 0 0 0-.44 2.256c0 .788.15 1.532.45 2.234.301.695.717 1.31 1.247 1.848.53.53 1.142.949 1.837 1.257.701.3 1.46.45 2.277.45Zm-.01-3.91c-.523 0-.967-.185-1.332-.558a1.824 1.824 0 0 1-.548-1.321 1.8 1.8 0 0 1 .548-1.321c.365-.366.81-.548 1.332-.548a1.8 1.8 0 0 1 1.322.548c.372.365.558.805.558 1.32 0 .51-.186.95-.558 1.322a1.784 1.784 0 0 1-1.322.559Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <p className="text-3xl mb-2 global_title">
                            We don't store your data
                        </p>
                        <p className="text text-gray-400">
                            We don't store any of your data on our servers so
                            you don't need to worry about your data being
                            compromised.
                        </p>
                    </div>
                </div>
            </div>
            <div className="text-center font-semibold mt-16 mb-10">
                <p className="title mb-7">
                    One tool,{" "}
                    <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 inline-block text-transparent bg-clip-text">
                        multiple
                    </span>{" "}
                    apps
                </p>
                <div className="flex items-center justify-center flex-wrap">
                    <Image
                        className="w-16 h-16 mx-5 my-4 mid:my-2"
                        src={`/providers/google.svg`}
                        alt=""
                        width={10}
                        height={10}
                    />
                    <Image
                        className="w-16 h-16 mx-5 my-4 mid:my-2"
                        src={`/providers/github.svg`}
                        alt=""
                        width={10}
                        height={10}
                    />
                    <Image
                        className="w-16 h-16 mx-5 my-4 mid:my-2"
                        src={`/providers/dropbox.svg`}
                        alt=""
                        width={10}
                        height={10}
                    />
                    <Image
                        className="w-16 h-16 mx-5 my-4 mid:my-2"
                        src={`/providers/figma.svg`}
                        alt=""
                        width={10}
                        height={10}
                    />
                    <Image
                        className="w-16 h-16 mx-5 my-4 mid:my-2"
                        src={`/providers/notion.svg`}
                        alt=""
                        width={10}
                        height={10}
                    />
                    <Image
                        className="w-16 h-16 mx-5 my-4 mid:my-2"
                        src={`/providers/one_drive.svg`}
                        alt=""
                        width={10}
                        height={10}
                    />
                </div>
            </div>
            <div
                style={{
                    background: 'url("/images/scribbles_blue.png")',
                }}
                className="p-10 my-16 text-center"
            >
                <p className="lora shadow pt-3 mx-auto mid:max-w-3xl text-xl mid:text-2xl text-white">
                    "I’ve been using Chronos for a little while now and I can
                    definitely say that it has made file searching so much
                    easier!"
                </p>
                <div className="mt-5 flex items-center">
                    <div className="ml-auto mr-2.5">
                        <img
                            className="shadow-lg"
                            src="https://www.notion.so/cdn-cgi/image/format=auto,width=128,quality=100/front-static/shared/logos/color/metalab.png"
                        />
                    </div>
                    <p className="text-left text-tiny mr-auto ml-2.5">
                        <span className="font-medium">Pritpal Saini</span>
                        <br />
                        <span>Founder and CEO, 89 Alkaline</span>
                    </p>
                </div>
            </div>
            <div className="mx-auto mb-10 max-w-5xl">
                <div className="bg-dark-compliment-hovered rounded-md p-5 mb-2.5 m-5">
                    <div className="flex flex-col-reverse mid:flex-row items-center">
                        <div className="w-full mid:p-5 mid:pl-8">
                            <svg
                                viewBox="0 0 41 41"
                                className="w-7 h-auto text-primary-color mb-3"
                            >
                                <path
                                    d="M8.1862 36.2334L32.37 36.2979C35.6645 36.3067 37.4544 34.5276 37.4651 31.2618L37.4922 23.0327C37.499 20.9898 37.2429 20.1259 36.3116 18.9438L31.9998 13.3071C30.1662 10.9284 29.2621 10.221 26.5718 10.2138L14.1562 10.1807C11.4803 10.1735 10.5717 10.876 8.70796 13.2449L4.35906 18.8584C3.43439 20.0501 3.15825 20.8981 3.15151 22.941L3.12438 31.1701C3.11362 34.4359 4.90606 36.2246 8.1862 36.2334ZM20.317 26.6411C18.1015 26.6352 16.7542 25.0922 16.7603 23.2363L16.761 23.0349C16.7633 22.3444 16.3626 21.6815 15.4995 21.6792L7.60123 21.6581C6.99699 21.6565 6.91229 21.1671 7.2013 20.7795L12.3304 14.1465C12.865 13.4574 13.4991 13.1426 14.3479 13.1448L26.3607 13.1769C27.2095 13.1792 27.8414 13.4974 28.3715 14.1893L33.4424 20.8495C33.7432 21.2388 33.6409 21.7276 33.0511 21.7261L25.1528 21.705C24.2896 21.7027 23.8846 22.3634 23.8824 23.0539L23.8817 23.2553C23.8756 25.1112 22.5182 26.647 20.317 26.6411Z"
                                    fill="currentColor"
                                ></path>
                            </svg>

                            <p className="text-3xl mb-2 global_title">
                                Desktop & mobile
                            </p>
                            <p className="text text-gray-400">
                                The Chronos desktop and mobile apps are about to
                                launched for mac, iOS, Windows and Android so
                                that you can search your files anywhere,
                                anytime.
                            </p>
                        </div>
                        <div className="w-full py-7 px-20">
                            <img
                                className="mx-auto max-w-xs w-full h-auto"
                                src="/images/passing.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-10">
                <p className="big_title text-4xl mid:text-5xl">
                    Get started for free
                </p>
                <p className="mt-2 font-medium text-gray-500">
                    Play around with it first. See if it sticks to your
                    workflow.
                </p>
                <div className="mx-auto w-52 mt-5">
                    <a href="/signup">
                        <Button
                            label="Try Chronos free"
                            colored
                            icon={BiRightArrowAlt}
                        />
                    </a>
                </div>
                <img
                    className="mt-10 w-full h-80 text-red-500"
                    src="/images/get_started.svg"
                />
            </div>
            <Footer />
        </>
    );
}
