import type * as mitt from 'mitt'
import { isSetup, saveAsSetup } from './elements'

export const prefix = 'x' as const
export type Prefix = typeof prefix

export type AttribType = 'bind' | 'event'

export type CreateNames<TDivider extends ':' | '-', TName extends string> = `${Prefix}${TDivider}${TName}`
export type CreateEventName<TName extends string, TValue extends string> = `${CreateNames<':', TName>}:${TValue}`

export type InteraAttribSetup = (parent: ParentNode, emitter: Emitter) => void
export type InteraAttrib = {
	name: string
	type: AttribType
	setup: InteraAttribSetup
}

export type Attrib = keyof InteraAttribDef

export type AttribName = CreateNames<'-', Attrib>
export type AttribQuery = `[${AttribName}]`
export type AttribEventName = CreateEventName<Attrib, string>
export type AttribAndName = `${AttribName}="${string}"`

export function getAttrName(attrib: Attrib): AttribName {
	return `${prefix}-${attrib}` as const
}

export function getAttrValue(element: HTMLElement, attrib: Attrib) {
	return element.getAttribute(getAttrName(attrib)) ?? undefined
}

export function getAttrQuery(attrib: Attrib): AttribQuery {
	return `[${getAttrName(attrib)}]` as const
}

export function createAttr(attrib: Attrib, value: string): AttribAndName {
	return `${getAttrName(attrib)}="${value}"` as const
}

export function selectAllWithAttr(parent: ParentNode, attrib: Attrib) {
	return parent.querySelectorAll(getAttrQuery(attrib))
}

export function getAttrEventName(attrib: Attrib, value: string): AttribEventName {
	return `${prefix}:${attrib}:${value}` as const
}

// eslint-disable-next-line ts/consistent-type-definitions
export interface InteraAttribDef {
}

export type Events = {
	[TAttrib in Attrib as CreateEventName<TAttrib, string>]: InteraAttribDef[TAttrib]
} & {
	ready: true
}

export type Emitter = mitt.Emitter<Events>
type BindSetupFn = (element: HTMLElement, value: string, emitter: Emitter) => void

export function setupAllAttrTypeFactory(attrib: Attrib, setup: BindSetupFn) {
	return (parent: ParentNode, emitter: Emitter) => {
		for (const element of selectAllWithAttr(parent, attrib)) {
			if (element instanceof HTMLElement && !isSetup(element, attrib)) {
				saveAsSetup(element, attrib)

				const value = getAttrValue(element, attrib)
				if (value) {
					setup(element, value, emitter)
				}
			}
		}
	}
}
