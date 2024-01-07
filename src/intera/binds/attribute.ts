import { type Emitter, type InteraAttrib, getAttrEventName, setupAllAttrTypeFactory } from '../attrib'

const name = 'attr'

declare module '../attrib' {
	// eslint-disable-next-line ts/consistent-type-definitions
	interface InteraAttribDef {
		attr: 'attr'
	}
}

export const attr = {
	type: 'bind',
	name,
	setup: setupAllAttrTypeFactory(name, setupElement),
} satisfies InteraAttrib

function setupElement(element: Element, attrName: string, emitter: Emitter) {
	const eventName = getAttrEventName(name, attrName)

	emitter.on(eventName, (value) => {
		element.setAttribute(attrName, String(value))
	})
}
