'use client'
import { createContext, ReactNode, useEffect, useState } from 'react'
import axios from 'axios'
import PageLoader from '@/components/PageLoader'
import { IUser } from '@/types'

interface IUserContext {
	isLoading: boolean
	user: IUser | null | undefined
	error: any
	setUser: (user: IUser | null) => void
}

export const Context = createContext<IUserContext>({
	isLoading: false,
	user: null,
	error: '',
	setUser: () => {},
})

export default function UserProvider({ children }: { children: ReactNode }) {
	const [isLoading, setIsLoading] = useState(false)
	const [user, setUser] = useState<IUser | null>()
	const [error, setError] = useState()
	useEffect(() => {
		const currentUser = async () => {
			setIsLoading(true)
			try {
				const response = await axios.get('/api/auth/me')
				setUser(response?.data?.user)
			} catch (error: any) {
				setError(error)
			} finally {
				setIsLoading(false)
			}
		}
		currentUser()
	}, [])

	if (isLoading) return <PageLoader />
	return <Context.Provider value={{ isLoading, user, error, setUser }}>{children}</Context.Provider>
}
