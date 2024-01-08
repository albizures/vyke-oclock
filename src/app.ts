import fs from 'node:fs'
import { dency } from '@vyke/dency'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { type RoutesManagerBase, routesManagerId } from './routes-manager'
import { rootSola } from './sola'
import { env } from './env'

const sola = rootSola.withTag('app')

export type AppBase = {
	createRouter: () => Hono
	start: (port?: number) => void
	build: () => void
}

export const appId = dency.create<AppBase>('appId')

type AppMeta = {
	type: 'static' | 'dynamic'
}

dency.bind(appId, (routesManager: RoutesManagerBase) => {
	const router = new Hono()

	function getAppMeta(): AppMeta {
		return {
			type: routesManager.meta.dynamic === 0 ? 'static' : 'dynamic',
		}
	}

	function writeMeta(meta: AppMeta) {
		fs.writeFileSync('./dist/meta.json', JSON.stringify(meta))
	}

	// only for development
	let staticMounted = false

	return {
		createRouter() {
			if (env.PROD) {
				router.use('/static/*', serveStatic({ root: './dist' }))
			}
			else if (!staticMounted) {
				router.use('/static/*', serveStatic({ root: './dist' }))
				staticMounted = true
			}
			routesManager.mount(router)

			sola.log('routes mounted')

			return router
		},
		start(port = 8787) {
			serve({
				fetch: router.fetch,
				port,
			}, () => {
				console.warn(`App listening in localhost:${port}`)
			})
		},
		build() {
			const appMeta = getAppMeta()
			routesManager.renderStaticRoutes()

			if (appMeta.type === 'static') {
				// removing server code
				fs.unlinkSync('./dist/index.js')
			}

			writeMeta(appMeta)
		},
	} satisfies AppBase
}, [routesManagerId] as const)
