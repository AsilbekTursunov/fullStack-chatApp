'use client'
import { usePathname } from 'next/navigation'
import { BellIcon, HomeIcon, ShipWheelIcon } from 'lucide-react'
import Link from 'next/link'
import { useUserContext } from '@/hooks/useUserContext'

const Sidebar = () => {
	const { user } = useUserContext()

	const pathName = usePathname()

	if (pathName.startsWith('/dashboard/chat') || pathName.startsWith('/dashboard/call')) return null
	return (
		<aside className='w-64  border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0'>
			<div className='p-5 h-20'>
				<Link href='/dashboard' className='flex items-center gap-2.5'>
					<ShipWheelIcon className='size-9 text-primary' />
					<span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider'>
						Chatty
					</span>
				</Link>
			</div>

			<nav className='flex-1 p-4 space-y-1'>
				<Link
					href='/dashboard'
					className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
						pathName === '/dashboard' ? 'btn-active' : ''
					}`}
				>
					<HomeIcon className='size-5 text-base-content opacity-70' />
					<span>Home</span>
				</Link>

				{/* <Link
					to='/friends'
					className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
						currentPath === '/friends' ? 'btn-active' : ''
					}`}
				>
					<UsersIcon className='size-5 text-base-content opacity-70' />
					<span>Friends</span>
				</Link> */}

				<Link
					href='/dashboard/notifications'
					className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
						pathName === '/dashboard/notifications' ? 'btn-active' : ''
					}`}
				>
					<BellIcon className='size-5 text-base-content opacity-70' />
					<span>Notifications</span>
				</Link>
			</nav>

			{/* USER PROFILE SECTION */}
			<div className='p-4 border-t border-base-300 mt-auto'>
				<div className='flex items-center gap-3'>
					<div className='avatar'>
						<div className='w-10 rounded-full'>
							<img src={user?.profilePic} alt='User Avatar' />
						</div>
					</div>
					<div className='flex-1'>
						<p className='font-semibold text-sm'>{user?.fullName}</p>
						<p className='text-xs text-success flex items-center gap-1'>
							<span className='size-2 rounded-full bg-success inline-block' />
							Online
						</p>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
