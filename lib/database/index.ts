import mongoose from 'mongoose'
import { DB_URL } from '../util'
let isConnected: boolean = false // Track the connection status

export const connectDB = async () => {
	mongoose.set('strictQuery', false) // Set strictQuery to false

	if (isConnected) {
		console.log('MongoDB is already connected')
		return
	}

	try {
		await mongoose.connect(DB_URL, {
			autoCreate: true, // Automatically create the database if it doesn't exist
			bufferCommands: false, // Disable buffering of commands when the connection is not established
		})
		isConnected = true // Update the connection status
		console.log('MongoDB connected successfully')
	} catch (error) {
		console.error('MongoDB connection error:', error)
	}
}
