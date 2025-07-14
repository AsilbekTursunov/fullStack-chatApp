import { Context } from '@/app/UserProvider'
import { useContext } from 'react'

export const useUserContext = () => {
	const context = useContext(Context)
	if (!context) throw new Error('useUserContext must be used within a UserProvider')
	return {
		user: context.user,
		setUser: context.setUser,
		isLoading: context.isLoading,
		error: context.error,
	}
}
