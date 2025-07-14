import { connectDB } from '@/lib/database'
import User from '@/lib/models/User'
import { generateToken, userDto } from '@/lib/util'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { email, password } = await req.json()
	try {
		await connectDB()
		const existUser = await User.findOne({ email })
		if (!existUser)
			return NextResponse.json({
				ok: false,
				status: 404,
				error: 'User not found or not authorized',
			})

		const decoded = await bcrypt.compare(password, existUser.password)
		if (!decoded) {
			return NextResponse.json({ ok: false, status: 401, error: 'Invalid password' })
		}

		const token = generateToken({ id: String(existUser._id), email })

		;(await cookies()).set('token', token, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true, // prevent XSS attacks,
			secure: true,
		})

		return NextResponse.json({ ok: true, status: 200, user: userDto(existUser) }, { status: 200 })
	} catch (error) {
		console.log(error)

		return NextResponse.json({ ok: false, status: 500, error }, { status: 500 })
	}
}
