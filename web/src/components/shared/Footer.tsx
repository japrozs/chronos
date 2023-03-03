import React from "react";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
    return (
        <div className="flex flex-col md:flex-row text-md justify-center md:space-x-10 border-t border-gray-900 items-center p-3">
            <p className="font-medium text-gray-600">Chronos 2023</p>
            <a
                href={"/privacy-policy"}
                className="font-medium text-gray-600 hover:text-gray-500 transition-all cursor-pointer hover:underline"
            >
                Privacy Policy
            </a>
            <a
                href={"/t-and-c"}
                className="font-medium text-gray-600 hover:text-gray-500 transition-all cursor-pointer hover:underline"
            >
                T&C
            </a>
        </div>
    );
};
