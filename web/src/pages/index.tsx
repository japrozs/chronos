import { Button } from "@/components/ui/Button";
import { useIsAuth } from "@/utils/useIsAuth";
import Image from "next/image";
import { BiRightArrowAlt } from "react-icons/bi";

export default function Home() {
    useIsAuth();
    return (
        <>
            <div
                style={{
                    borderColor: "#161c2a",
                }}
                className="px-6 py-3 bg-black border-b  top-0 sticky"
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
                                <Button label="Login" className="py-1.5" />
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
                <p className="text-5xl md:text-7xl font-semibold mt-24 md:mt-32">
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
        </>
    );
}
