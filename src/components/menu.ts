import clsx from 'clsx'
import { a, div } from '../elements'
import { Icons } from './icons'

export function Menu(active: 'clock' | 'stopwatch' | 'timer') {
	return div({ class: 'flex justify-center sticky top-0 py-4 -mt-20 md:-mt-24' },
		div({ role: 'tablist', class: 'tabs tabs-boxed mb-4 md:mb-6 md:tabs-lg' },
			a({ role: 'tab', href: '/', class: clsx('tab md:text-xl text-sm gap-1', active === 'clock' && 'tab-active') },
				Icons.Clock({ class: '' }),
				'Time',
			),
			a({ role: 'tab', href: '/stopwatch', class: clsx('tab md:text-xl text-sm gap-1', active === 'stopwatch' && 'tab-active') },
				Icons.Stopwatch({ class: '' }),
				'Stopwatch',
			),
			a({ role: 'tab', href: '/timer', class: clsx('tab md:text-xl text-sm gap-1', active === 'timer' && 'tab-active') },
				Icons.Timer({ class: 'inline-block' }),
				'Timer',
			),
		),
	)
}
