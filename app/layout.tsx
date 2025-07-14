import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import GlobalProvider from './provider'
import { Toaster } from 'react-hot-toast'
import UserProvider from './UserProvider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Chatty Messanger',
	description: 'Everyone can send message with friends and also can video call with them',
	icons: {
		icon: '/chatty.png',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<GlobalProvider>
					<UserProvider>{children}</UserProvider>
				</GlobalProvider>
				<Toaster
					position='top-right'
					reverseOrder={false}
					toastOptions={{
						className: '',
						duration: 5000,
					}}
				/>
			</body>
		</html>
	)
}
