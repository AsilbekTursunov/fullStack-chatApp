'use client'
import { generateStreamToken } from '@/actions/chat/stream'
import CallButton from '@/components/CallButton'
import ChatLoader from '@/components/ChatLoader'
import { useUserContext } from '@/hooks/useUserContext'
import { streamClient } from '@/lib/stream' 
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { StreamChat } from 'stream-chat'
import {
	Chat,
	Channel,
	ChannelHeader,
	MessageInput,
	MessageList,
	Thread,
	Window,
} from 'stream-chat-react'
import 'stream-chat-react/dist/css/v2/index.css'

export const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!

const ChatPage = () => {
	const { id: targetUserId } = useParams()
	const [chatClient, setChatClient] = useState<StreamChat | null>(null)
	const [channel, setChannel] = useState<ReturnType<StreamChat['channel']> | null>(null)
	const [loading, setLoading] = useState(true)
	const { user } = useUserContext()

	useEffect(() => {
		const initChat = async () => {
			if (!user || streamClient.userID) return // ❗ allaqachon ulangan bo‘lsa, to‘xtat

			const token = await generateStreamToken(user.id)
			if (!token) return

			try {
				console.log('Initializing Stream chat client...')

				// ❗ Bu yerda tekshirish qo‘shamiz
				if (!streamClient.userID) {
					await streamClient.connectUser(
						{
							id: user.id,
							name: user.fullName,
							image: user.profilePic,
						},
						token
					)
				}

				const channelId = [user.id, targetUserId].sort().join('-')
				const currChannel = streamClient.channel('messaging', channelId, {
					members: [user.id, targetUserId!],
				})

				await currChannel.watch()

				setChatClient(streamClient)
				setChannel(currChannel) // ❗ oldin xatolik bor: setChannel(channel) emas, setChannel(currChannel)
			} catch (error) {
				console.error('Error initializing chat:', error)
				toast.error('Could not connect to chat. Please try again.')
			} finally {
				setLoading(false)
			}
		}

		initChat()
	}, [])

	const handleVideoCall = () => {
		if (channel) {
			const callUrl = `${window.location.origin}/dashboard/call/${channel.id}`

			channel.sendMessage({
				text: `I've started a video call. Join me here: ${callUrl}`,
			})

			toast.success('Video call link sent successfully!')
		}
	}

	// console.log('loading', loading)
	// console.log('chatClient', chatClient)
	// console.log('channel', channel)
	if (loading || !chatClient || !channel) return <ChatLoader />
	console.log('start')

	return (
		<div className='h-[80vh]'>
			<Chat client={chatClient}>
				<Channel channel={channel}>
					<div className='w-full relative'>
						<CallButton handleVideoCall={handleVideoCall} />
						<Window>
							<ChannelHeader />
							<MessageList />
							<MessageInput focus />
						</Window>
					</div>
					<Thread />
				</Channel>
			</Chat>
		</div>
	)
}

export default ChatPage
