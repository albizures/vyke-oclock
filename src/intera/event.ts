import { type AttribItem, getAttrEventName, getAttrName } from './attrib'

export type Event = ReturnType<typeof createEvent>

export function createEvent<
	TAttrib extends { name: string, type: 'event' },
>(attr: TAttrib, value: string): AttribItem<TAttrib['name']> {
	const attrName = getAttrName(attr.name)
	return {
		eventName: getAttrEventName(attr.name, value),
		attrName,
		value,
		attr: {
			[attrName]: value,
		} as AttribItem<TAttrib['name']>['attr'],
	}
}
