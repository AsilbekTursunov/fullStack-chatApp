'use client'
import CButton from '@/components/CButton'
import { useMutation } from '@tanstack/react-query'
import { Bell, Loader2, LogOut, Palette, ShipWheelIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useUserContext } from '@/hooks/useUserContext'
import axios from 'axios'

const Navbar = () => {
	const { user: authUser, setUser } = useUserContext()
	const router = useRouter()
	const pathname = usePathname()
	const isChatPage = pathname.startsWith('/dashboard/chat')
	const isCallPage = pathname.startsWith('/dashboard/call')
	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			const response = await axios.post('/api/auth/logout')
			return response.data
		},
		onSuccess: () => {
			router.push('/')
			setUser(null)
		},
	})
	if (!authUser) return null
	return (
		<div
			className={`flex items-center ${
				isChatPage || isCallPage ? 'justify-between' : 'justify-end'
			} p-4 h-20 border-b border-base-300`}
		>
			{(isChatPage || isCallPage) && (
				<Link href='/' className='flex items-center space-x-2'>
					<ShipWheelIcon className='size-9 text-primary' />
					<span className='text-3xl font-bold'>Chatty</span>
				</Link>
			)}
			<div className='flex items-center gap-1'>
				<CButton className='mx-2 px-2'>
					<Bell />
				</CButton>
				<CButton className='mx-2 '>
					{/* <Theme /> */}
					<Palette />
				</CButton>
				<CButton className='mx-2 '>
					<img
						src={authUser?.profilePic}
						alt={authUser?.fullName}
						className='w-8 h-8 rounded-full'
					/>
				</CButton>
				<CButton className='mx-2 '>
					{isPending ? (
						<Loader2 className='loading animate-spin' />
					) : (
						<LogOut onClick={() => mutate()} />
					)}
				</CButton>
			</div>
		</div>
	)
}

export default Navbar
