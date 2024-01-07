import { type Attrib, createAttr, getAttrEventName, getAttrName } from './attrib'

export type Bind = ReturnType<typeof createBind>

export function createBind<
	TAttr extends { name: Attrib, type: 'bind' },
>(attr: TAttr, value: string) {
	return {
		eventName: getAttrEventName(attr.name, value),
		attrName: getAttrName(attr.name),
		value,
		attr: createAttr(attr.name, value),
	}
}
