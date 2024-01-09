import { type Emitter, type InteraAttrib, getAttrEventName, setupAllAttrTypeFactory } from '../attrib'

const name = 'click' as const

declare module '../attrib' {
	// eslint-disable-next-line ts/consistent-type-definitions
	interface InteraAttribDef {
		'click': unknown
	}
}

export const click = {
	type: 'event',
	name,
	setup: setupAllAttrTypeFactory(name, setupElement),
} satisfies InteraAttrib

function setupElement(element: HTMLElement, value: string, emitter: Emitter) {
	const eventName = getAttrEventName(name, value)

	element.addEventListener('click', (event) => {
		emitter.emit(eventName, JSON.stringify(event))
	})
}
