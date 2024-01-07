import type { HtmlChild } from '@vyke/elements/v'
import { div, span } from '../../elements'
import type { Bind } from '../../intera/bind'
import { clockBinds } from './clock-attribs'

function ClockValueContainer(...children: Array<HtmlChild>) {
	return div({ class: 'flex text-ellipsis flex-col md:text-2xl' }, ...children)
}

function ClockValue(label: string, bind: Bind) {
	return ClockValueContainer(
		span({ class: 'countdown font-mono justify-center text-4xl md:text-8xl' },
			span({
				[bind.attrName]: bind.value,
				style: `--value: 0`,
			}),
		),
		label,
	)
}

export function Clock() {
	return div({ class: 'grid grid-flow-col gap-5 text-center auto-cols-max' },
		ClockValue('hours', clockBinds.hours),
		span({ class: 'text-4xl md:text-7xl' }, ':'),
		ClockValue('minutes', clockBinds.minutes),
		span({ class: 'text-4xl md:text-7xl' }, ':'),
		ClockValue('seconds', clockBinds.seconds),
	)
}
