'use client'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { generateStreamToken } from '@/actions/chat/stream'
import { useUserContext } from '@/hooks/useUserContext'
import toast from 'react-hot-toast'
import { STREAM_API_KEY } from '../../chat/[id]/page'
import {
	StreamVideoClient,
	Call, 
	StreamVideo,
	StreamCall,
} from '@stream-io/video-react-sdk'
import PageLoader from '@/components/PageLoader'
import { CallContent } from '../../_components/CallContent'
import '@stream-io/video-react-sdk/dist/css/styles.css'

const CallPage = () => {
	const { id: callId } = useParams()
	const [client, setClient] = useState<StreamVideoClient | null>(null)
	const [call, setCall] = useState<Call | null>(null)
	const [isConnecting, setIsConnecting] = useState(true)
	const { user: authUser, isLoading } = useUserContext()

	useEffect(() => {
		const initCall = async () => {
			const token = await generateStreamToken(authUser?.id!)
			if (!token || !authUser || !callId) return

			try {
				console.log('Initializing Stream video client...')

				const user = {
					id: authUser.id,
					name: authUser.fullName,
					image: authUser.profilePic,
				}

				const videoClient = new StreamVideoClient({
					apiKey: STREAM_API_KEY,
					user,
					token,
				})

				const callInstance = videoClient.call('default', callId as string)

				await callInstance.join({ create: true })

				console.log('Joined call successfully')

				setClient(videoClient)
				setCall(callInstance)
			} catch (error) {
				console.error('Error joining call:', error)
				toast.error('Could not join the call. Please try again.')
			} finally {
				setIsConnecting(false)
			}
		}

		initCall()
	}, [])

	if (isLoading || isConnecting) return <PageLoader />
	return (
		<>
			<div className='h-screen flex flex-col items-center justify-center'>
				<div className='relative'>
					{client && call ? (
						<StreamVideo client={client}>
							<StreamCall call={call}>
								<CallContent />
							</StreamCall>
						</StreamVideo>
					) : (
						<div className='flex items-center justify-center h-full'>
							<p>Could not initialize call. Please refresh or try again later.</p>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default CallPage
