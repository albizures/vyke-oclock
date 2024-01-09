import { createBind } from '../../intera/bind'
import { className } from '../../intera/binds/className'
import { styleProp } from '../../intera/binds/style'
import { createEvent } from '../../intera/event'
import { click } from '../../intera/events/click'

export const stopwatchBinds = {
	hours: createBind(styleProp, 's-hours'),
	minutes: createBind(styleProp, 's-minutes'),
	seconds: createBind(styleProp, 's-seconds'),
	milli: createBind(styleProp, 's-milli'),

	pause: createBind(className, 's-pause'),
	play: createBind(className, 's-play'),
}

export const stopwatchEvents = {
	play: createEvent(click, 's-play'),
	pause: createEvent(click, 's-pause'),
	reset: createEvent(click, 's-reset'),
}
