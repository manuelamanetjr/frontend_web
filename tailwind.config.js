// import('tailwindcss').Config
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./*.{js,jsx,ts,tsx}", "*.{js,ts,jsx,tsx,mdx}", "index.html"],
    theme: {
        extend: {

                purple: {
                    50: "#f5f3ff",
                    100: "#ede9fe",
                    200: "#ddd6fe",
                    300: "#c4b5fd",
                    400: "#a78bfa",
                    500: "#8b5cf6",
                    600: "#7c3aed",
                    700: "#6237A0",
                    800: "#5b21b6",
                    900: "#4c1d95",
                    950: "#2e1065",
                },
                borderRadius: {
                    lg: "var(--radius)",
                    md: "calc(var(--radius) - 2px)",
                    sm: "calc(var(--radius) - 4px)",
                },
            },
        },

    plugins: [],
};
