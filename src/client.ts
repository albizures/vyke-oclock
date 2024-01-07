import './style.css'
import requestAnimationFrames from 'request-animation-frames'
import { styleProp } from './intera/binds/style'
import { intera } from './intera/intera'
import { getClockValues } from './components/clock/clock-values'
import { clockBinds } from './components/clock/clock-attribs'

intera.emitter.on('ready', async () => {
	for await (const _timestamp of requestAnimationFrames()) {
		const values = getClockValues(new Date())
		intera.emitter.emit(clockBinds.hours.eventName, ['--value', values.hours])
		intera.emitter.emit(clockBinds.minutes.eventName, ['--value', values.minutes])
		intera.emitter.emit(clockBinds.seconds.eventName, ['--value', values.seconds])
	}
})

intera.init([styleProp])
