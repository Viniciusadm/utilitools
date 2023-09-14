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
            'p-light': '#19C37D',
            'p-dark': '#10B26C',
            's-light': '#F97316',
            's-dark': '#EA580C',
            'white': '#FFFFFF',
        },
        extend: {},
    },
    plugins: [],
}
