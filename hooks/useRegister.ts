import { signUpUser } from '@/lib/api'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useRegister = () => {
	const queryClient = useQueryClient()
	const {
		mutate: registerUser,
		isPending,
		error,
	} = useMutation({
		mutationKey: ['registerUser'],
		mutationFn: signUpUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['getUser'] })
		},
	})

	return { registerUser, isPending, error }
}
