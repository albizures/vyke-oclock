import { dency } from '@vyke/dency'
import { routesManagerId } from '../routes-manager'
import { renderPage } from '../components/Page'
import { h1 } from '../elements'

dency.use(routesManagerId).register({
	type: 'static',
	method: 'get',
	path: '/',
	render: () => {
		return renderPage(
			h1('hello'),
		)
	},

})
