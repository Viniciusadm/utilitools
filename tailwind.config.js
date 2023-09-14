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
            'a-light': '#6B7280',
            'a-dark': '#1F2937',
            't-light': '#1F2937',
            't-dark': '#F9FAFB',
            'h-light': 'rgb(229 231 235)',
            'h-dark': 'rgb(55 65 81)',
            'p-light': {
                DEFAULT: '#19C37D',
                light: '#1EE08B',
            },
            'p-dark': {
                DEFAULT: '#10B26C',
                light: '#19C37D',
            },
            's-light': {
                DEFAULT: '#F97316',
                light: '#FCA5A5',
            },
            's-dark': {
                DEFAULT: '#EA580C',
                light: '#F97316',
            },
            'white': '#FFFFFF',
            'success': '#10B26C',
            'danger': '#EF4444',
        },
        extend: {},
    },
    plugins: [],
}
