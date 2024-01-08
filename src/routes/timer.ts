import { dency } from '@vyke/dency'
import { Fragment } from '@vyke/elements/v'
import { routesManagerId } from '../routes-manager'
import { renderPage } from '../components/Page'
import { div } from '../elements'
import { Clock } from '../components/clock/clock'
import { Menu } from '../components/menu'

dency.use(routesManagerId).register({
	type: 'static',
	method: 'get',
	path: '/timer',
	render: () => {
		return renderPage('index',
			Fragment(
				Clock(),
				Menu('timer'),
				div({ class: 'w-full h-screen flex' },
					'test',
				),
			),
		)
	},
})
