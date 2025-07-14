import { LANGUAGE_TO_FLAG } from '@/constants'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Image from 'next/image'
export const NEXT_PUBLIC_JWT_SECRET_KEY = '8f3b8c2d4e5a6b7c8d9e0f1a2b3c4d5e6f7g8h9i0j'

export const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10)
	return bcrypt.hashSync(password, salt)
}

export const generateToken = ({ id, email }: { id: string; email: string }) => {
	const token = jwt.sign({ email, id }, NEXT_PUBLIC_JWT_SECRET_KEY, {
		expiresIn: '14d',
	})
	return token
}

export const verifyToken = (token: string) => {
	const tokenVerifty = jwt.verify(token, NEXT_PUBLIC_JWT_SECRET_KEY)
	return tokenVerifty
}

export const userDto = (newUser: any) => {
	return {
		fullName: newUser.fullName,
		email: newUser.email,
		bio: newUser.bio,
		profilePic: newUser.profilePic,
		nativeLanguage: newUser.nativeLanguage,
		learningLanguage: newUser.learningLanguage,
		location: newUser.location,
		isOnboarded: newUser.isOnboarded,
		friends: newUser.friends,
		id: newUser._id,
		createdAt: newUser.createdAt,
		updatedAt: newUser.updatedAt,
	}
}

export const capitialize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

export const filterUpcoming = (reqs: any) => {
	return reqs.map((item: any) => ({
		id: item._id,
		recipient: item.recipient,
		sender: {
			id: item.sender._id,
			fullName: item.sender.fullName,
			profilePic: item.sender.profilePic,
			nativeLanguage: item.sender.nativeLanguage,
			learningLanguage: item.sender.learningLanguage,
		},
		status: item.status,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt,
	}))
}

export const filterAccepted = (reqs: any) => {
	return reqs.map((item: any) => ({
		id: item._id,
		sender: item.sender,
		recipient: {
			id: item.recipient._id,
			fullName: item.recipient.fullName,
			profilePic: item.recipient.profilePic,
		},
		status: item.status,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt,
	}))
}

export const filterRequest = (reqs: any) => {
	return reqs.map((item: any) => ({
		id: item._id,
		sender: item.sender,
		recipient: {
			id: item.recipient.id,
			fullName: item.recipient.fullName,
			profilePic: item.recipient.profilePic,
			nativeLanguage: item.recipient.nativeLanguage,
			learningLanguage: item.recipient.learningLanguage,
		},
		status: item.status,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt,
	}))
}

export const userDetails = (user: any) => {
	return {
		fullName: user.fullName,
		email: user.email,
		bio: user.bio,
		profilePic: user.profilePic,
		nativeLanguage: user.nativeLanguage,
		learningLanguage: user.learningLanguage,
		location: user.location,
		isOnboarded: user.isOnboarded,
		friends: user.friends,
		id: user._id,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt,
	}
}

export const DB_URL =
	'mongodb+srv://asilbekt84:d6QqYrryvQdpbv7s@cluster0.icmkhi7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
export const JWT_SECRET_KEY = '8f3b8c2d4e5a6b7c8d9e0f1a2b3c4d5e6f7g8h9i0j'
export const STREAM_API_KEY = 't9ds23bhcwf7'
export const STREAM_SECRET_KEY = 'v87qgkxzruqr2qtw4vd6ete8jfqv4gqgrqen9b3s3sxk4q22axsc4xppczsmeegh'
