import { div, span } from '../../elements'
import type { Bind } from '../../intera/bind'
import { stopwatchBinds } from './stopwatch-attribs'

function ClockValue(bind: Bind) {
	return span({ class: 'countdown value-label font-mono justify-center text-4xl sm:text-8xl md:text-9xl' },
		span({
			[bind.attrName]: bind.value,
			style: `--value: 0`,
		}),
	)
}

function ClockMilliValue(bind: Bind) {
	return span({ class: 'countdown font-mono text-sm sm:text-4xl md:text-6xl' },
		'.',
		span({
			class: 'no-transition',
			[bind.attrName]: bind.value,
			style: `--value: 0`,
		}),
	)
}

export function Stopwatch() {
	return div({ class: 'clock-container pb-10 w-full h-screen flex justify-center items-center' },
		div({ class: '' },
			ClockValue(stopwatchBinds.hours),
			span({ class: 'text-4xl sm:text-8xl md:text-9xl' }, ':'),
			ClockValue(stopwatchBinds.minutes),
			span({ class: 'text-4xl sm:text-8xl md:text-9xl' }, ':'),
			ClockValue(stopwatchBinds.seconds),
			ClockMilliValue(stopwatchBinds.milli),
		),
	)
}
