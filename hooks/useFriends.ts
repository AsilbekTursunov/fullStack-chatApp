import { Context } from '@/app/UserProvider'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'

export const useFriends = () => {
	const { user } = useContext(Context)
	const { data, isLoading, error } = useQuery({
		queryKey: ['getFriends'],
		queryFn: async () => {
			const response = await axios.post(`/api/users/friends`, { userId: user?.id })
			return response.data
		},
		enabled: !!user,
	})

	return { oldFriends: data?.friends, friendsLoading: isLoading, error }
}
