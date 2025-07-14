import { connectDB } from '@/lib/database'
import User from '@/lib/models/User'
import { generateToken, hashPassword, userDto } from '@/lib/util'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, res: NextResponse) {
	const { fullName, email, password } = await req.json()
	try {
		await connectDB()
		if (!fullName || !email || !password) {
			return NextResponse.json({ ok: false, error: 'All fields required' })
		}

		const existUser = await User.findOne({ email })
		if (existUser) {
			return NextResponse.json({ ok: false, error: 'User is already registred' })
		}

		const hashedPassword = await hashPassword(password)

		const idx = Math.floor(Math.random() * 100) + 1 // generate a num between 1-100
		const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

		const newUser = await User.create({
			fullName,
			email,
			password: hashedPassword,
			profilePic: randomAvatar,
		})
		const token = generateToken({ id: String(newUser._id), email })

		;(await cookies()).set('token', token, {
			maxAge: 7 * 24 * 60 * 60 * 1000,
			httpOnly: true, // prevent XSS attacks,
			secure: true,
		})
		return NextResponse.json(
			{
				ok: true,
				status: 200,
				user: userDto(newUser),
			},
			{ status: 200 }
		)
	} catch (error) {
		return NextResponse.json({ ok: false, status: 500, error: 'server error' }, { status: 500 })
	}
}
