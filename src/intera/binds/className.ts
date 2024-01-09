import { type Emitter, type InteraAttrib, getAttrEventName, setupAllAttrTypeFactory } from '../attrib'

const name = 'class' as const

const actions = ['add', 'toggle', 'remove', 'set'] as const
type Action = (typeof actions)[number]

declare module '../attrib' {
	// eslint-disable-next-line ts/consistent-type-definitions
	interface InteraAttribDef {
		class: [action: Action, value: string]
	}
}

export const className = {
	type: 'bind',
	name,
	setup: setupAllAttrTypeFactory(name, setupElement),
} satisfies InteraAttrib

function setupElement(element: Element, attrName: string, emitter: Emitter) {
	const eventName = getAttrEventName(name, attrName)

	emitter.on(eventName, (data) => {
		if (Array.isArray(data)) {
			const [action, value] = data
			if (action === 'set') {
				element.className = value
			}
			else {
				element.classList[action](value)
			}
		}
	})
}
