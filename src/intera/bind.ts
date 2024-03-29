import { type AttribItem, getAttrEventName, getAttrName } from './attrib'

export type Bind = ReturnType<typeof createBind>

export function createBind<
	TAttrib extends { name: string, type: 'bind' },
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
