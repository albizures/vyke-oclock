import { type Emitter, type InteraAttrib, getAttrEventName, setupAllAttrTypeFactory } from '../attrib'

const name = 'style-prop' as const

declare module '../attrib' {
	// eslint-disable-next-line ts/consistent-type-definitions
	interface InteraAttribDef {
		'style-prop': [prop: string, value: string | number]
	}
}

export const styleProp = {
	type: 'bind',
	name,
	setup: setupAllAttrTypeFactory(name, setupElement),
} satisfies InteraAttrib

function setupElement(element: HTMLElement, value: string, emitter: Emitter) {
	const eventName = getAttrEventName(name, value)

	emitter.on(eventName, (data) => {
		if (Array.isArray(data)) {
			const [prop, value] = data
			element.style.setProperty(prop, String(value))
		}
	})
}
