import type { Handler } from 'hono'

type RouteMethod = 'post' | 'get' | 'put' | 'all'

export type DynamicRouteDef = {
	path: string
	method: RouteMethod
	type: 'dynamic'
	handler: Handler
}

export type StaticRouteDef = {
	path: string
	method: 'get'
	type: 'static'
	render: () => string
}

export type RouteDef = DynamicRouteDef | StaticRouteDef
