import { useUser } from '@/store/useUser'
import axios from 'axios'

export const signUpUser = async (user: { fullName: string; email: string; password: string }) => {
	const response = await axios.post('/api/auth/register', user)
	return response.data
}

export const loginUser = async (user: { email: string; password: string }) => {
	const response = await axios.post('/api/auth/login', user)
	return response.data
}

export const logoutUser = async () => {
	const response = await axios.post('/api/auth/logout')
	return response.data
}

export const getMe = async () => {
	const response = await axios.get('/api/auth/me')
	return response.data
}

export const sendFriendRequest = async (recipenter: string) => {
	const { user } = useUser()
	const response = await axios.post(`/api/users/friend-request`, {
		recipientId: recipenter,
		currentUserId: user?.id,
	})
	return response.data
}

export async function getOngoingFriendReqs() {
	const { user } = useUser()
	const response = await axios.get(`/api/users/ongoing-friend-request/${user?.id}`) 
	return response.data
}

export const getFriendRequests = async () => {
	const { user } = useUser()
	const response = await axios.get('/api/users/friends-requests', {
		params: {
			userId: user?.id,
		},
	})
	return response.data
}

export const acceptFriendRequest = async (requestId: string) => {
	const { user } = useUser()
	const response = await axios.put(`/api/users/friend-request-accept`, {
		requestId,
		userId: user?.id,
	})
	return response.data
}
