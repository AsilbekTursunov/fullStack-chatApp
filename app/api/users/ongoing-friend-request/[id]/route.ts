import { connectDB } from '@/lib/database'
import FriendRequest from '@/lib/models/FriendRequest'
import { filterRequest } from '@/lib/util'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, context: { params: { id: string } }) {
	const userId = context.params.id

	try {
		await connectDB()
		const ongoingRequest = await FriendRequest.find({
			sender: userId,
			status: 'pending',
		}).populate('recipient', 'fullName profilePic nativeLanguage learningLanguage')

		if (!ongoingRequest) {
			return NextResponse.json({ message: 'No ongoing friend request found' }, { status: 404 })
		}

		return NextResponse.json(
			{ ok: true, status: 200, ongoingRequest: filterRequest(ongoingRequest) },
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ ok: false, status: 500, error: 'Server error' }, { status: 500 })
	}
}
