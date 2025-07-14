import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token')?.value // Cookie'dan tokenni olish
	const { pathname } = request.nextUrl

	// Asosiy sahifa (/) va login sahifasi uchun cheklov qo'yilmaydi
	if (pathname === '/' || pathname === '/login') {
		return NextResponse.next()
	}

	// Token bo'lmasa, foydalanuvchini asosiy sahifaga yo'naltirish
	if (!token) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return NextResponse.next()
}

// Himoyalanadigan routelarni belgilash
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], // API va statik fayllarni chetlab o'tish
}
