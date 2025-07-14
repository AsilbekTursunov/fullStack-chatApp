import { generateStreamToken } from '@/actions/chat/stream'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = await params
		const token = await generateStreamToken(id)
		if (!token) {
			return NextResponse.json({ message: 'Failed to generate Stream token' })
		}
		return NextResponse.json({ ok: true, token }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ ok: false, error: 'Error creating token' }, { status: 201 })
	}
}
