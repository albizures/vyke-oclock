import '../style.css'
import requestAnimationFrames from 'request-animation-frames'
import { styleProp } from '../intera/binds/style'
import { intera } from '../intera/intera'
import { stopwatchBinds } from '../components/stopwatch/stopwatch-attribs'

export function getStopwatchValues(start: number, current: number) {
	const delta = current - start
	const rawHours = delta / 3_600_000
	const hours = Math.floor(rawHours)
	const hoursInMilli = hours * 3_600_000
	const rawMinutes = (delta - hoursInMilli) / 60_000
	const minutes = Math.floor(rawMinutes)
	const minutesInMilli = minutes * 60_000
	const rawSeconds = (delta - hoursInMilli - minutesInMilli) / 1000
	const seconds = Math.floor(rawSeconds)
	const secondsInMilli = seconds * 1000
	const milli = Math.floor((delta - hoursInMilli - minutesInMilli - secondsInMilli) / 10)

	return {
		hours,
		minutes,
		seconds,
		milli,
	}
}

intera.emitter.on('ready', async () => {
	const start = Date.now()

	for await (const _timestamp of requestAnimationFrames()) {
		const values = getStopwatchValues(start, Date.now())

		intera.emitter.emit(stopwatchBinds.hours.eventName, ['--value', values.hours])
		intera.emitter.emit(stopwatchBinds.minutes.eventName, ['--value', values.minutes])
		intera.emitter.emit(stopwatchBinds.seconds.eventName, ['--value', values.seconds])
		intera.emitter.emit(stopwatchBinds.milli.eventName, ['--value', values.milli])
	}

	setInterval(() => {

	}, 2000)
})

intera.init([styleProp])
