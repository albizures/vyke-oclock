export type ElementMetadata = {
	attrsSetup: Set<string>
}

export const elements = new WeakMap<HTMLElement, ElementMetadata>()

export function isSetup(element: HTMLElement, attr: string) {
	const metadata = elements.get(element)

	return Boolean(metadata && metadata.attrsSetup.has(attr))
}

export function saveAsSetup(element: HTMLElement, attr: string) {
	const metadata = elements.get(element) ?? {
		attrsSetup: new Set(),
	}

	metadata.attrsSetup.add(attr)

	elements.set(element, metadata)
}
