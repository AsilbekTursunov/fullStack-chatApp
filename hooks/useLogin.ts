import { loginUser } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useSignIn = () => {
	const queryClient = useQueryClient()
	const {
		mutate: signInUser,
		isPending,
		error,
		data,
	} = useMutation({
		mutationKey: ['loginUser'],
		mutationFn: loginUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getUser'] })
		},
		onError: error => {
			console.log('login error', error)
		},
	})

	return { signInUser, isPending, error, data }
}
