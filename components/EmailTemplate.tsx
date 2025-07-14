import { IUser } from '@/types'
import React from 'react'

type FriendRequestEmailProps = {
	sender: IUser
}

const EmailTemplate = ({ sender }: FriendRequestEmailProps) => {
	return (
		<div className='max-w-md mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200'>
			<h2 className='text-2xl font-bold text-green-600 text-center mb-4'>New Friend Request</h2>

			<p className='text-gray-700 text-center'>
				<strong>{sender.fullName}</strong> has sent you a friend request on <strong>Chatty</strong>.
			</p>

			<div className='flex items-center gap-4 mt-6'>
				<img
					src={sender.profilePic}
					alt={`${sender.fullName}'s profile`}
					className='w-16 h-16 rounded-full border'
				/>
				<div>
					<p className='text-lg font-medium text-gray-700'>{sender.fullName}</p>
					<p className='text-sm text-gray-500'>
						Native: {sender.nativeLanguage} | Learning: {sender.learningLanguage}
					</p>
				</div>
			</div>

			<div className='text-center mt-6'>
				<a
					href='https://chatty-stream-app.vercel.app/dashboard/notifications'
					className='inline-block bg-green-600 text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition'
				>
					Accept Request
				</a>
			</div>

			<p className='text-xs text-gray-400 text-center mt-6'>
				You received this message because you're registered on Chatty.
			</p>
		</div>
	)
}

export default EmailTemplate
