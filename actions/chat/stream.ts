'use server'

import { STREAM_API_KEY, STREAM_SECRET_KEY } from '@/lib/util'
import { StreamChat } from 'stream-chat'

const apiKey = STREAM_API_KEY
const apiSecret = STREAM_SECRET_KEY

if (!apiKey || !apiSecret) {
	console.log('STREAM_API_KEY and STREAM_SECRET_KEY must be set in the environment variables')
}

const serverClient = StreamChat.getInstance(apiKey, apiSecret)

export const upsetStreamUser = async (userData: any) => {
	try {
		await serverClient.upsertUser(userData)
		return userData
	} catch (error) {
		console.error('Error updating Stream user:', error)
		throw new Error('Failed to update Stream user')
	}
}

export const generateStreamToken = async (userId: string) => {
	try {
		const userIdString = userId.toString()
		return serverClient.createToken(userIdString)
	} catch (error) {
		console.error('Error generating Stream token:', error)
	}
}
