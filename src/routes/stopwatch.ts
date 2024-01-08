import { dency } from '@vyke/dency'
import { Fragment } from '@vyke/elements/v'
import { routesManagerId } from '../routes-manager'
import { renderPage } from '../components/Page'
import { div } from '../elements'
import { Stopwatch } from '../components/stopwatch/stopwatch'
import { Menu } from '../components/menu'

dency.use(routesManagerId).register({
	type: 'static',
	method: 'get',
	path: '/stopwatch',
	render: () => {
		return renderPage('stopwatch',
			Fragment(
				Stopwatch(),
				Menu('stopwatch'),
				div({ class: 'w-full h-screen flex' },
					'test',
				),
			),
		)
	},
})
