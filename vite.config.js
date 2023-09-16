import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import purgeBootstrapIcons from 'vite-plugin-purge-bootstrap-icons'
import fs from 'fs';
import path from 'path';

const utilsDir = 'resources/ts/utils';

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
        purgeBootstrapIcons(),
    ],
});
