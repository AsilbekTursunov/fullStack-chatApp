import { connectDB } from '@/lib/database'
import User from '@/lib/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, context: { params: { id: string } }) {
	const userId = context.params.id
	try {
		await connectDB()
		const friends = await User.findById(userId)
			.select('friends')
			.populate('friends', 'fullName profilePic nativeLanguage learningLanguage location')
		const oldFriends = await friends?.friends.map((user: any) => ({
			id: user._id,
			fullName: user.fullName,
			profilePic: user.profilePic,
			nativeLanguage: user.nativeLanguage,
			learningLanguage: user.learningLanguage,
			location: user.location,
		}))

		return NextResponse.json({ ok: true, status: 200, friends: oldFriends }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ ok: false, status: 500, error: 'Server error' }, { status: 500 })
	}
}
