import fs from 'node:fs'
import { dency } from '@vyke/dency'
import type { Handler, Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import type { RouteDef } from './route'
import { rootSola } from './sola'

const sola = rootSola.withTag('router-manager')

type RoutesMeta = {
	static: number
	dynamic: number
}

export type RoutesManagerBase = {
	meta: RoutesMeta
	register: (def: RouteDef) => void
	mount: (router: Hono) => void
	renderStaticRoutes: () => void
}

export const routesManagerId = dency.create<RoutesManagerBase>('routes-manager')

dency.bind(routesManagerId, () => {
	const routes = new Map<string, RouteDef>()
	const meta = {
		static: 0,
		dynamic: 0,
	}

	const dynamicMounted = new Map<string, Handler>()
	const staticMounted = new Map<string, () => string>()

	return {
		meta,
		register(def) {
			sola.log('registering', def.path)

			meta[def.type] += 1

			routes.set(def.path, def)
		},

		mount(router) {
			sola.log('mounting all')
			for (const [name, route] of routes) {
				if (route.type === 'dynamic') {
					const alreadyMounted = dynamicMounted.has(name)
					dynamicMounted.set(name, route.handler)
					if (!alreadyMounted) {
						if (import.meta.env.PROD) {
							router[route.method](route.path, route.handler)
						}
						else {
							router[route.method](route.path, (context, next) => {
								return dynamicMounted.get(name)!(context, next)
							})
						}
					}
				}

				if (route.type === 'static') {
					const alreadyMounted = staticMounted.has(name)
					staticMounted.set(name, route.render)
					if (!alreadyMounted) {
						if (import.meta.env.PROD) {
							router.use(serveStatic({ path: `./dist/${name}.html` }))
						}
						else {
							router.get(route.path, (context) => {
								return context.html(staticMounted.get(name)!())
							})
						}
					}
				}
			}
		},
		renderStaticRoutes() {
			for (const [name, route] of routes) {
				if (route.type === 'static') {
					const baseName = name.endsWith('/') ? `${name}index` : name
					const filename = `./dist${baseName}.html`
					sola.log(`- ${filename} created`)
					fs.writeFileSync(filename, route.render())
				}
			}
		},
	} satisfies RoutesManagerBase
}, [])
