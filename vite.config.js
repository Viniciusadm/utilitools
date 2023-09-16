import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import fs from 'fs';
import path from 'path';

const utilsDir = 'resources/js/utils';

function getUtilsFiles() {
    const files = fs.readdirSync(utilsDir);
    return files
        .filter((file) => file.endsWith('.js'))
        .map((file) => path.join(utilsDir, file));
}

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                ...getUtilsFiles(),
            ],
            refresh: true,
        }),
    ],
});
