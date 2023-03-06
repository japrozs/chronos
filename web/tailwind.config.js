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
            backgroundImage: {
                scribbles: "url('/images/scribbles.png')",
                "scribbles-blue": "url('/images/scribbles_blue.png')",
            },
            screens: {
                mid: "870px",
            },
            spacing: {
                90: "22.5rem",
            },
            fontSize: {
                tiny: "0.89rem",
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
