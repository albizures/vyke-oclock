import { defineConfig } from 'vite'
import devServer, { defaultOptions } from '@hono/vite-dev-server'

export default defineConfig(({ mode }) => {
	if (mode === 'client') {
		return {
			build: {
				minify: 'terser',
				lib: {

					entry: ['./src/client/index.ts', './src/client/stopwatch.ts', './src/client/timer.ts'],
					formats: ['es'],
					fileName: '[name]',
					name: '[name]',
				},
				rollupOptions: {
					output: {
						dir: './dist/static',
					},
				},
				emptyOutDir: false,
				copyPublicDir: false,
			},
		}
	}

	return {
		plugins: [
			devServer({
				exclude: [
					...defaultOptions.exclude,
					/(.*\.css$|.*\.css\?t=[\d]+$)/,
				],
				entry: 'src/index.ts',
			}),
		],
		build: {
			minify: 'terser',
			lib: {
				entry: './src/index.ts',
				formats: ['es'],
				fileName: 'index',
				name: 'index',
			},
			rollupOptions: {
				external: [
					'@hono/node-server',
					'stream',
					'fs',
					'node:fs',
					'node:process',
				],
				output: {
					dir: './dist',
				},
			},
			emptyOutDir: false,
			copyPublicDir: false,
		},
	}
})
