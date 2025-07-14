import { Context } from '@/app/(root)/UserProvider'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext } from 'react'

export const useRecommended = () => {
	const { user } = useContext(Context)
	const { data, isLoading, error } = useQuery({
		queryKey: ['getRecommended'],
		queryFn: async () => {
			const response = await axios.get(`/api/users/recommended/${user?.id}`)
			return response.data
		},
		enabled: !!user,
	})

	return { recommendedUsers: data?.newFriends, isLoading, error }
}
