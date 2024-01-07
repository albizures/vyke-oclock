export function getClockValues(date: Date) {
	return {
		hours: zeroPad(date.getHours()),
		minutes: zeroPad(date.getMinutes()),
		seconds: zeroPad(date.getSeconds()),
	}
}

function zeroPad(value: number) {
	const strValue = String(value)

	if (strValue.length === 1) {
		return `0${strValue}`
	}

	return strValue
}
