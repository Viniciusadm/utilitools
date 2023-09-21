import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import fs from 'fs';
import path from 'path';

const utilsDir = 'resources/ts/pages';

function getUtilsFiles() {
    const files = fs.readdirSync(utilsDir);
    return files
        .filter((file) => file.endsWith('.ts'))
        .map((file) => path.join(utilsDir, file));
}

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/ts/app.ts',
                ...getUtilsFiles(),
            ],
            refresh: true,
        }),
    ],
});
