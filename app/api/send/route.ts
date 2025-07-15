import { NextRequest, NextResponse } from 'next/server'
import User from '@/lib/models/User'
import { mailOptions, transporter } from '@/config/nodemailer'

export async function POST(req: NextRequest) {
	const { senderId, recipentId } = await req.json()

	const sender = await User.findById(senderId)
	const recipent = await User.findById(recipentId)
	await transporter.sendMail({
		...mailOptions(sender, recipent),
		subject: 'New friend request from Chatty',
	})

	return NextResponse.json({ sucess: 'Send Sucessfully' }, { status: 200 })
}
