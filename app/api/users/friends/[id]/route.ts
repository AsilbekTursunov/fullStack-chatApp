import { connectDB } from '@/lib/database'
import User from '@/lib/models/User'
import { userDto } from '@/lib/util'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		await connectDB()
		const { id: userId } = await params
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
