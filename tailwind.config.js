/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        colors: {
            'b-light': '#F3F4F6',
            'b-dark': '#111827',
            't-light': '#1F2937',
            't-dark': '#F9FAFB',
        },
        extend: {},
    },
    plugins: [],
}
