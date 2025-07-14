import { connectDB } from '@/lib/database'
import FriendRequest from '@/lib/models/FriendRequest'
import { filterAccepted, filterUpcoming } from '@/lib/util'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: { id: string } }) {
	try {
		await connectDB()
		const userId = params.id
		const upcomingFriendRequests = await FriendRequest.find({
			recipient: userId,
			status: 'pending',
		}).populate('sender', 'fullName profilePic nativeLanguage learningLanguage')

		const acceptedFriendRequests = await FriendRequest.find({
			sender: userId,
			status: 'accepted',
		}).populate('recipient', 'fullName profilePic')

		return NextResponse.json({
			ok: true,
			status: 200,
			upcomingFriendRequests: filterUpcoming(upcomingFriendRequests),
			acceptedFriendRequests: filterAccepted(acceptedFriendRequests),
		})
	} catch (error) {
		return NextResponse.json({
			ok: false,
			status: 500,
			error: 'Server error',
		})
	}
}
