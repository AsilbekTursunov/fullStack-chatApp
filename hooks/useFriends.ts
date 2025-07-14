import { Context } from '@/app/(root)/UserProvider' 
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'

export const useFriends = () => {
	const { user } = useContext(Context)
	const { data, isLoading, error } = useQuery({
		queryKey: ['getFriends'],
		queryFn: async () => {
			const response = await axios.get(`/api/users/friends/${user?.id}`)
			return response.data
		},
		enabled: !!user,
	})

	return { oldFriends: data?.friends, friendsLoading: isLoading, error }
}
