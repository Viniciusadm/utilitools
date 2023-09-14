/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        colors: {
            'b-light': {
                DEFAULT: '#F3F4F6',
                light: '#F9FAFB',
            },
            'b-dark': {
                DEFAULT: '#111827',
                light: '#1F2937',
            },
            't-light': '#1F2937',
            't-dark': '#F9FAFB',
            'p-light': {
                DEFAULT: '#19C37D',
                light: '#1EE08B',
            },
            'p-dark': {
                DEFAULT: '#10B26C',
                light: '#19C37D',
            },
            's-light': '#F97316',
            's-dark': '#EA580C',
            'white': '#FFFFFF',
        },
        extend: {},
    },
    plugins: [],
}
