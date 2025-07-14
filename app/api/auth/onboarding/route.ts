import { connectDB } from '@/lib/database'
import User from '@/lib/models/User'
import { upsetStreamUser } from '@/actions/chat/stream'
import { generateToken, hashPassword, userDetails, userDto } from '@/lib/util'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
	await connectDB()
	const { fullName, bio, nativeLanguage, learningLanguage, location, userId } = await req.json()
	try {
		if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
			return NextResponse.json(
				{
					message: 'All fields are required',
					missingFields: [
						!fullName && 'fullName',
						!bio && 'bio',
						!nativeLanguage && 'nativeLanguage',
						!learningLanguage && 'learningLanguage',
						!location && 'location',
					].filter(Boolean),
				},
				{ status: 400 }
			)
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				fullName,
				bio,
				nativeLanguage,
				learningLanguage,
				location,
				isOnboarded: true,
			},
			{ new: true }
		)

		if (!updatedUser) return NextResponse.json({ message: 'User not found' }, { status: 404 })

		try {
			await upsetStreamUser({
				id: updatedUser._id.toString(),
				name: updatedUser.fullName,
				image: updatedUser.profilePic || '',
			})
			console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`)
		} catch (streamError: any) {
			console.log('Error updating Stream user during onboarding:', streamError.message)
		}

		return NextResponse.json({
			success: true,
			user: userDetails(updatedUser),
		})
	} catch (error) {
		console.error('Onboarding error:', error)
		NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
	}
}
