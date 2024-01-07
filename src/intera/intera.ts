import * as mitt from 'mitt'
import type { Events, InteraAttrib } from './attrib'

export function createIntera() {
	const emitter = mitt.default<Events>()
	return {
		init(attrs: Array<InteraAttrib> = []) {
			if (typeof window === 'undefined') {
				return
			}

			for (const attr of attrs) {
				attr.setup(document.body, emitter)
			}

			emitter.emit('ready', true)
		},
		emitter,
	}
}

export const intera = createIntera()
