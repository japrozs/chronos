import Image from "next/image";
import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
    return (
        <div className="md:space-x-10 border-t border-gray-900 items-center pt-10 p-5">
            <Image
                src="/logo.svg"
                className="h-8 w-auto mx-auto"
                height={20}
                width={20}
                alt="logo"
            />
        </div>
    );
};
