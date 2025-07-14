'use client'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import { useUserContext } from '@/hooks/useUserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
	const { user } = useUserContext()
	const router = useRouter()
	useEffect(() => {
		if (user && user.isOnboarded) {
			router.push('/dashboard')
		} else if (user && !user.isOnboarded) {
			router.push('/onboarding')
		}
	}, [])
	return (
		<div className='flex flex-col h-screen'>
			<Navbar />
			<div className='flex-1  flex  '>
				<Hero />
			</div>
		</div>
	)
}
