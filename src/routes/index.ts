import { dency } from '@vyke/dency'
import { routesManagerId } from '../routes-manager'
import { renderPage } from '../components/Page'
import { div } from '../elements'
import { Clock } from '../components/clock/clock'

dency.use(routesManagerId).register({
	type: 'static',
	method: 'get',
	path: '/',
	render: () => {
		return renderPage(
			div({ class: 'clock-container fixed inset w-full h-full flex justify-center items-center' },
				Clock(),
			),
		)
	},
})
