import { connectDB } from '@/lib/database'
import User from '@/lib/models/User'
import { userDto, verifyToken } from '@/lib/util'
import { NextApiRequest, NextApiResponse } from 'next'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, context: { params: { id: string } }) {
	const userId = context.params.id
	try {
		await connectDB()
		const user = await User.findById(userId)
		const recommendedUsers = await User.find({
			$and: [
				{ _id: { $ne: userId } }, // Exclude current user
				{ isOnboarded: true }, // Only include onboarded users
				{ _id: { $nin: user.friends } }, // Exclude users who are already friends
			],
		})
		const recommendedUserDetails = recommendedUsers.map(user => ({
			id: user._id,
			fullName: user.fullName,
			profilePic: user.profilePic,
			nativeLanguage: user.nativeLanguage,
			learningLanguage: user.learningLanguage,
			location: user.location,
		}))
		return NextResponse.json(
			{ ok: true, status: 200, newFriends: recommendedUserDetails },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ ok: false, status: 500, error: 'Server error' }, { status: 500 })
	}
}
