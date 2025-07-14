import { Context } from '@/app/UserProvider'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'

export const useRecommended = () => {
	const { user } = useContext(Context)
	const { data, isLoading, error } = useQuery({
		queryKey: ['getRecommended'],
		queryFn: async () => {
			const response = await axios.post(`/api/users/recommended`, {
				userId: user?.id,
			})
			return response.data
		},
		enabled: !!user,
	})

	return { recommendedUsers: data?.newFriends, isLoading, error }
}
