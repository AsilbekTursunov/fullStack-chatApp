import { connectDB } from '@/lib/database'
import FriendRequest from '@/lib/models/FriendRequest'
import User from '@/lib/models/User'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest, res: NextResponse) {
	try {
		await connectDB()
		const { requestId, userId } = await req.json()
		const friendRequest = await FriendRequest.findById(requestId) 

		if (!friendRequest) {
			return NextResponse.json({ message: 'Friend request not found' }, { status: 404 })
		}
		if (friendRequest.recipient.toString() !== userId.toString()) {
			return NextResponse.json(
				{ message: 'You are not authorized to accept this request' },
				{ status: 403 }
			)
		}
		// add each user to the other's friends array
		// $addToSet: adds elements to an array only if they do not already exist.
		await User.findByIdAndUpdate(friendRequest.sender, {
			$addToSet: { friends: friendRequest.recipient },
		})

		await User.findByIdAndUpdate(friendRequest.recipient, {
			$addToSet: { friends: friendRequest.sender },
		})

		friendRequest.status = 'accepted'
		await friendRequest.save()
		return NextResponse.json({ ok: true, status: 200 })
	} catch (error) {
		return NextResponse.json({ ok: false, status: 500, error: 'Server error' })
	}
}
