import type { AnyVykeElement } from '@vyke/elements/v'
import { $ } from '@vyke/elements/v/server'
import { body, head, html, link, script } from '../elements'
import { env } from '../env'

export function renderPage(scriptName: string, children: AnyVykeElement) {
	return `<!DOCTYPE html>
	${$(html({ 'lang': 'en', 'data-theme': 'dark' },
			head(
				env.PROD
					? link({ href: '/static/style.css', rel: 'stylesheet' })
					: undefined,
					script({
						type: 'module',
						src: env.PROD
							? `/static/${scriptName}.js`
							: `/src/client/${scriptName}.ts`,
					}),
			),
			body(
				children,
			),
		),
	)}
	`
}
