import { connectDB } from '@/lib/database'
import FriendRequest from '@/lib/models/FriendRequest'
import User from '@/lib/models/User'
import { filterAccepted, filterUpcoming } from '@/lib/util'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
	try {
		await connectDB()
		const { recipientId, currentUserId } = await req.json()

		if (recipientId == currentUserId) {
			return NextResponse.json({ message: 'You cannot send a friend request to yourself.' })
		}

		const recipient = await User.findById(recipientId)
		if (!recipient) {
			return NextResponse.json({ message: 'Recipient not found' })
		}
		// check if user is already friends
		if (recipient.friends.includes(currentUserId)) {
			return NextResponse.json({ message: 'You are already friends with this user' })
		}

		// check if a req already exists
		const existingRequest = await FriendRequest.findOne({
			$or: [
				{ sender: currentUserId, recipient: recipientId },
				{ sender: recipientId, recipient: currentUserId },
			],
		})

		if (existingRequest) {
			return NextResponse.json({
				message: 'A friend request already exists between you and this user',
			})
		}

		// Create a new friend request
		const friendRequest = await FriendRequest.create({
			sender: currentUserId,
			recipient: recipientId,
		})

		return NextResponse.json({ ok: true, status: 200, friendRequest })
	} catch (error) {
		return NextResponse.json({ ok: false, status: 500, error: 'Server error' })
	}
}


