import { connectDB } from '@/lib/database'
import User from '@/lib/models/User'
import { userDto, verifyToken } from '@/lib/util'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		await connectDB()
		const tokenCookie = (await cookies()).get('token')

		const token = tokenCookie?.value ?? 'token'
		if (!token) {
			return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
		}
		const devodeToken = verifyToken(token)
		if (!devodeToken || typeof devodeToken === 'string' || !('email' in devodeToken)) {
			return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 404 })
		}

		const user = await User.findOne({ email: devodeToken.email })
		if (!user)
			return NextResponse.json(
				{ ok: false, status: 404, error: 'User not found or not authorized' },
				{ status: 404 }
			)

		return NextResponse.json({ ok: true, status: 200, user: userDto(user) }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ ok: false, status: 500, error: 'Tokin invalid' }, { status: 500 })
	}
}
