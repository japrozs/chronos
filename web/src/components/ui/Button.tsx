import React, { ElementType } from "react";
import { IconType } from "react-icons/lib";
import { Spinner } from "../shared/Spinner";

type ButtonProps = {
    label: string;
    className?: string;
    colored?: boolean;
    loading?: boolean;
    icon?: IconType;
} & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({
    label,
    colored,
    icon: Icon,
    loading = false,
    className,
    ...props
}) => {
    return (
        <button
            style={{
                fontFamily: "Inter",
                fontWeight: 444,
            }}
            className={`${
                loading && "cursor-not-allowed"
            } flex items-center justify-center group button-component ${
                colored
                    ? "bg-primary-color border-blue-600 hover:opacity-90"
                    : "bg-dark-compliment border-gray-800 hover:bg-dark-compliment-hovered"
            } focus:ring-2 focus:ring-border-blue-100 transition-all text-smol py-1.5 w-full rounded-md border  ${className}`}
            {...props}
        >
            {loading ? (
                <>
                    <Spinner className="w-6 h-6 text-gray-700 fill-dark-compliment hover:fill-dark-compliment-hovered" />
                </>
            ) : (
                <>
                    {label}{" "}
                    {Icon && (
                        <Icon
                            className={`transition-all ${
                                label.length != 0 && "ml-1 group-hover:ml-2"
                            } text-xl`}
                        />
                    )}
                </>
            )}
        </button>
    );
};
