import User from '@/lib/models/User'
import { userDto } from '@/lib/util'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { email } = await req.json()

	const existUser = await User.findOne({ email })

	if (!existUser) return NextResponse.json({ success: false }, { status: 401 })

	await User.findOneAndUpdate({ email }, { verified: true })
	return NextResponse.json(
		{ success: true, message: 'User email verified successfully', user: userDto(existUser) },
		{ status: 200 }
	)
}
