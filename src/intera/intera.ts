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
		on<TEventName extends keyof Events>(
			attrib: { eventName: TEventName },
			handler: (data: Events[TEventName]) => void,
		) {
			emitter.on(attrib.eventName, handler)
		},
		emit<TEventName extends keyof Events>(
			attrib: { eventName: TEventName },
			data: Events[TEventName],
		) {
			emitter.emit(attrib.eventName, data)
		},
		emitter,
	}
}

export const intera = createIntera()
