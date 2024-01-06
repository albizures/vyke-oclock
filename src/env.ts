import process from 'node:process'

export const env = {
	PROD: process.env.VYKE_MODE === 'build' || import.meta.env.PROD,
	BUILD: process.env.VYKE_MODE === 'build',
}
