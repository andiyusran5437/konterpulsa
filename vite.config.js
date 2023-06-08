import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        react(), eslintPlugin(),
        laravel({
            input: ['resources/js/app.tsx'],
            refresh: true,
        }),
    ],
});
