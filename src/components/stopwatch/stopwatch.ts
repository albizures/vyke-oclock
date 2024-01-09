import { button, div, span } from '../../elements'
import type { Bind } from '../../intera/bind'
import { Icons } from '../icons'
import { stopwatchBinds, stopwatchEvents } from './stopwatch-attribs'

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
	return div({ class: 'clock-container pb-10 w-full h-screen flex flex-col justify-center items-center' },
		div(
			ClockValue(stopwatchBinds.hours),
			span({ class: 'text-4xl sm:text-8xl md:text-9xl' }, ':'),
			ClockValue(stopwatchBinds.minutes),
			span({ class: 'text-4xl sm:text-8xl md:text-9xl' }, ':'),
			ClockValue(stopwatchBinds.seconds),
			ClockMilliValue(stopwatchBinds.milli),
		),
		div({ class: 'flex gap-2' },
			button({
				class: 'btn btn-xs md:btn-md',
				...stopwatchEvents.play.attr,
				...stopwatchBinds.play.attr,
			}, Icons.Play()),
			button({
				class: 'btn btn-xs md:btn-md hidden',
				...stopwatchEvents.pause.attr,
				...stopwatchBinds.pause.attr,
			}, Icons.Pause()),
			button({ class: 'btn btn-xs md:btn-md', ...stopwatchEvents.reset.attr }, Icons.Reload()),
		),
	)
}
