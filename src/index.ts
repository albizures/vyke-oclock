import { dency } from '@vyke/dency'
import { appId } from './app'
import './routes/index'
import { env } from './env'

const app = dency.use(appId)

const router = app.createRouter()

if (env.BUILD) {
	app.build()
}
else if (env.PROD) {
	app.start()
}

export default router
