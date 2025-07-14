'use client'
import { getLanguageFlag } from '@/components/CButton' 
import { capitialize } from '@/lib/util' 
import { useMutation,   useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from 'lucide-react'  
import { useUserContext } from '@/hooks/useUserContext'
import { IFriend } from '@/types'

const NewFriend = ({
	user,
	hasRequestBeenSent,
}: {
	user: IFriend
	hasRequestBeenSent: boolean
}) => {
	const queryClient = useQueryClient()
	const { user: sender } = useUserContext()

	const { mutate: sendFriendRequestMutation, isPending } = useMutation({
		mutationFn: async () => {
			const response = await axios.post(`/api/users/friend-request`, {
				recipientId: user?.id,
				currentUserId: sender?.id,
			})
			return response.data
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['outgoingFriendRequests'] })
		},
		retry: false,
	})

	return (
		<div key={user.id} className='card bg-base-200 hover:shadow-lg transition-all duration-300'>
			<div className='card-body p-5 space-y-4'>
				<div className='flex items-center gap-3'>
					<div className='avatar size-16 rounded-full'>
						<img src={user.profilePic} alt={user.fullName} />
					</div>

					<div>
						<h3 className='font-semibold text-lg'>{user.fullName}</h3>
						{user.location && (
							<div className='flex items-center text-xs opacity-70 mt-1'>
								<MapPinIcon className='size-3 mr-1' />
								{user.location}
							</div>
						)}
					</div>
				</div>

				{/* Languages with flags */}
				<div className='flex flex-wrap gap-1.5'>
					<span className='badge badge-secondary'>
						{getLanguageFlag(user.nativeLanguage)}
						Native: {capitialize(user.nativeLanguage)}
					</span>
					<span className='badge badge-outline'>
						{getLanguageFlag(user.learningLanguage)}
						Learning: {capitialize(user.learningLanguage)}
					</span>
				</div>

				{/* {user.bio && <p className='text-sm opacity-70'>{user.bio}</p>} */}
				{/* Action button */}
				<button
					className={`btn w-full mt-2 ${hasRequestBeenSent ? 'btn-disabled' : 'btn-primary'} `}
					onClick={() => sendFriendRequestMutation()}
					disabled={hasRequestBeenSent || isPending}
				>
					{hasRequestBeenSent ? (
						<>
							<CheckCircleIcon className='size-4 mr-2' />
							Request Sent
						</>
					) : (
						<>
							<UserPlusIcon className='size-4 mr-2' />
							Send Friend Request
						</>
					)}
				</button>
			</div>
		</div>
	)
}

export default NewFriend
