import Image from "next/image";
import React from "react";

interface FourOhFour {}

const FourOhFour: React.FC<FourOhFour> = ({}) => {
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
                    className="p-6"
                >
                    <p className="text-2xl text-gray-500 font-medium menlo mb-5">
                        404 Error
                    </p>
                    <p className="text-4xl  font-semibold">Page not found</p>
                    <p className="mt-2 text-md text-gray-600">
                        The page you are looking doesn't exist. Or does it?{" "}
                        <span className="font-semibold">It doesn't.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FourOhFour;
