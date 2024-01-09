import '../style.css'
import requestAnimationFrames from 'request-animation-frames'
import { styleProp } from '../intera/binds/style'
import { intera } from '../intera/intera'
import { stopwatchBinds, stopwatchEvents } from '../components/stopwatch/stopwatch-attribs'
import { click } from '../intera/events/click'
import { className } from '../intera/binds/className'

export function getStopwatchValues(delta: number) {
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

type StopwatchContext = {
	delta: number
	isPaused: boolean
}

const stopwatch = {
	async play(context: StopwatchContext) {
		let last = Date.now()
		for await (const _timestamp of requestAnimationFrames()) {
			const { isPaused } = context
			const now = Date.now()
			context.delta += now - last
			last = now

			const values = getStopwatchValues(context.delta)

			intera.emit(stopwatchBinds.hours, ['--value', values.hours])
			intera.emit(stopwatchBinds.minutes, ['--value', values.minutes])
			intera.emit(stopwatchBinds.seconds, ['--value', values.seconds])
			intera.emit(stopwatchBinds.milli, ['--value', values.milli])

			if (isPaused) {
				break
			}
		}
	},
	reset(context: StopwatchContext) {
		context.delta = 0
	},
	context: {
		delta: 0,
		isPaused: false,
	},
}

intera.on(stopwatchEvents.play, () => {
	if (!stopwatch.context.isPaused) {
		stopwatch.context.delta = 0
	}

	stopwatch.context.isPaused = false
	stopwatch.play(stopwatch.context)
	intera.emit(stopwatchBinds.play, ['add', 'hidden'])
	intera.emit(stopwatchBinds.pause, ['remove', 'hidden'])
})

intera.on(stopwatchEvents.pause, () => {
	stopwatch.context.isPaused = true
	intera.emit(stopwatchBinds.pause, ['add', 'hidden'])
	intera.emit(stopwatchBinds.play, ['remove', 'hidden'])
})

intera.on(stopwatchEvents.reset, () => {
	stopwatch.reset(stopwatch.context)
})

intera.init([styleProp, click, className])
