import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    name: string;
    label: string;
    fullWidth?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    fullWidth,
    ...props
}) => {
    const [field, { error }] = useField(props as any);
    return (
        <div className={"mt-3"}>
            <label
                className={"text-sm text-text-compliment-color text-opacity-60"}
                htmlFor={field.name}
            >
                {label}
            </label>
            <br />
            <input
                className={`${
                    fullWidth ? "w-full" : "w-80"
                } text-gray-300 transition-all text-smol placeholder-gray-600 py-1.5 px-3 mt-1.5 mb-1.5 bg-dark-compliment border rounded-md outline-none focus:ring-2 focus:ring-border-blue-100 ${
                    !!error ? "border-error-red" : "border-gray-800"
                }`}
                {...field}
                {...props}
                id={field.name}
                placeholder={props.placeholder}
            />
            {error && (
                <span className={"mt-1 font-medium text-sm text-red-500"}>
                    {error}
                </span>
            )}
        </div>
    );
};
