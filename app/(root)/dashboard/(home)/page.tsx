'use client'
import { useRecommended } from '@/hooks/userRecommend'
import { useQuery } from '@tanstack/react-query'
import NewFriend from '../_components/NewFriend'
import { useFriends } from '@/hooks/useFriends'
import NoFriendsFound from '../_components/NoFriendsFound'
import FriendCard from '../_components/FriendCard'
import Link from 'next/link'
import { Users2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import PageLoader from '@/components/PageLoader'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserContext } from '@/hooks/useUserContext'
import { IFriend } from '@/types'

const DashboardPage = () => {
	const [outgoingFriendReqs, setOutgoingFriendReqs] = useState(new Set())
	const { isLoading: contextLoading, user: authUser } = useUserContext()
	const { recommendedUsers, isLoading } = useRecommended()
	const { oldFriends, friendsLoading } = useFriends()
	const router = useRouter()

	if (contextLoading) return <PageLoader />

	const { data: outgoingFriendRequests, refetch } = useQuery({
		queryKey: ['outgoingFriendRequests'],
		queryFn: async () => {
			const response = await axios.post(`/api/users/ongoing-friend-request`, {
				userId: authUser?.id,
			})
			return response.data
		},
		retry: false,
		enabled: !!authUser,
	})

	useEffect(() => {
		if (authUser && authUser?.isOnboarded) {
			router.push('/dashboard')
		} else if (authUser && !authUser?.isOnboarded) {
			router.push('/onboarding')
		} else {
			router.push('/login')
		}
	}, [authUser])

	useEffect(() => {
		refetch()
		const ongoingRequests = new Set()

		outgoingFriendRequests?.ongoingRequest.forEach((req: any) => {
			ongoingRequests.add(req.recipient.id)
		})
		setOutgoingFriendReqs(ongoingRequests)
	}, [outgoingFriendRequests])

	return (
		<div className='p-4 sm:p-6 lg:p-8'>
			<div className='container mx-auto space-y-10'>
				<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
					<h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Your Friends</h2>
					<Link href='/dashboard/notifications' className='btn btn-outline btn-sm``'>
						<Users2Icon className='mr-2 size-4' />
						Friend Requests
					</Link>
				</div>

				{friendsLoading ? (
					<div className='flex justify-center py-12'>
						<span className='loading loading-spinner loading-lg' />
					</div>
				) : oldFriends?.length === 0 ? (
					<NoFriendsFound />
				) : (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
						{oldFriends?.map((friend: IFriend) => (
							<FriendCard key={friend.id} friend={friend} />
						))}
					</div>
				)}

				<section>
					<div className='mb-6 sm:mb-8'>
						<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
							<div>
								<h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet New Learners</h2>
								<p className='opacity-70'>
									Discover perfect language exchange partners based on your profile
								</p>
							</div>
						</div>
					</div>

					{isLoading ? (
						<div className='flex justify-center py-12'>
							<span className='loading loading-spinner loading-lg' />
						</div>
					) : recommendedUsers?.length === 0 ? (
						<div className='card bg-base-200 p-6 text-center'>
							<h3 className='font-semibold text-lg mb-2'>No recommendations available</h3>
							<p className='text-base-content opacity-70'>
								Check back later for new language partners!
							</p>
						</div>
					) : (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
							{recommendedUsers?.map((user: IFriend) => {
								const hasRequestBeenSent = outgoingFriendReqs.has(user.id)
								return (
									<NewFriend key={user.id} user={user} hasRequestBeenSent={hasRequestBeenSent} />
								)
							})}
						</div>
					)}
				</section>
			</div>
		</div>
	)
}

export default DashboardPage
