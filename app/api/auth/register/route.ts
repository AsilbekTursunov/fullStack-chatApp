import { emailOTP, transporter } from '@/config/nodemailer'
import { connectDB } from '@/lib/database'
import User from '@/lib/models/User'
import { generateToken, getRandomImage, hashPassword, userDto } from '@/lib/util'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const { fullName, email, password, code } = await req.json()
	try {
		await connectDB()
		if (!fullName || !email || !password) {
			return NextResponse.json({ ok: false, error: 'All fields required' })
		}

		const existUser = await User.findOne({ email })
		if (existUser) {
			return NextResponse.json({ ok: false, message: 'User is already registred' }, { status: 403 })
		}

		const hashedPassword = await hashPassword(password)
		const randomAvatar = getRandomImage(fullName)
		console.log('code', code)
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

		await transporter.sendMail({
			...emailOTP(code, newUser.email),
			subject: 'OTP verifation request from Chatty',
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
