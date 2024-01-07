import requestAnimationFrames from 'request-animation-frames'
import { styleProp } from './intera/binds/style'
import { intera } from './intera/intera'
import './style.css'
import { getClockValues } from './clock/clock-values'
import { clockBinds } from './clock/clock-attribs'

intera.emitter.on('ready', async () => {
	for await (const _timestamp of requestAnimationFrames()) {
		const values = getClockValues(new Date())
		intera.emitter.emit(clockBinds.hours.eventName, ['--value', values.hours])
		intera.emitter.emit(clockBinds.minutes.eventName, ['--value', values.minutes])
		intera.emitter.emit(clockBinds.seconds.eventName, ['--value', values.seconds])
	}
})

intera.init([styleProp])
