import { createBind } from '../intera/bind'
import { styleProp } from '../intera/binds/style'

export const clockBinds = {
	hours: createBind(styleProp, 'hours'),
	minutes: createBind(styleProp, 'minutes'),
	seconds: createBind(styleProp, 'seconds'),
}
