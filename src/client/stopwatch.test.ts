import { expect, it } from 'vitest'
import { getStopwatchValues } from './stopwatch'

it('stopwatch', () => {
	const start = new Date()
	const current = new Date(start.getTime())

	current.setHours(current.getHours() + 1)
	current.setMinutes(current.getMinutes() + 1)
	current.setSeconds(current.getSeconds() + 1)

	expect(getStopwatchValues(start.getTime(), current.getTime())).toMatchObject({
		hours: 1,
		minutes: 1,
		seconds: 1,
		milli: 0,
	})
})
