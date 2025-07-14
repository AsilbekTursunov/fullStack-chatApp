import EmailTemplate from '@/components/EmailTemplate'
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/lib/models/User'

const resend = new Resend('re_VoXbnb4x_Q2Sto7e4JMZN6attuzVdD4ae')

export async function POST(req: NextRequest) {
	const { senderId, recipentId } = await req.json()
	const sender = await User.findById(senderId)
	const recipent = await User.findById(recipentId)
	const { data, error } = await resend.emails.send({
		from: sender.email,
		to: recipent.email,
		subject: 'Hello world',
		react: EmailTemplate({ sender }),
	})

	if (error) {
		return NextResponse.json({ error }, { status: 400 })
	}

	return NextResponse.json({ data }, { status: 200 })
}
