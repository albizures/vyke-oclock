import { createBind } from '../../intera/bind'
import { styleProp } from '../../intera/binds/style'

export const stopwatchBinds = {
	hours: createBind(styleProp, 's-hours'),
	minutes: createBind(styleProp, 's-minutes'),
	seconds: createBind(styleProp, 's-seconds'),
	milli: createBind(styleProp, 's-milli'),
}
