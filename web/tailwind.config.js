/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontSize: {
                smol: "0.95rem",
            },
            colors: {
                "primary-color": "#007AFF",
                "dark-compliment": "#0B0E11",
                "error-red": "#c54b4b",
                "dark-compliment-hovered": "#14181D",
                "text-compliment-color": "#DEE3EA",
                "input-border-blue": "#88B9EA",
            },
        },
    },
    plugins: [],
};
