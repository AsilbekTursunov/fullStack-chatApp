// import { Context } from '@/app/(root)/UserProvider'
// import { getMe } from '@/lib/api' 
// import axios from 'axios'
// import { useContext, useState } from 'react'

// export const useGetUser = () => {
// 	const [loading, setLoading] = useState(false) 
// 	const getUser = async () => {
// 		setLoading(true)
// 		try {
// 			const response = await getMe()
// 			setUser(response.user)
// 		} catch (error) {
// 			console.log('getme', error)
// 		} finally {
// 			setLoading(false)
// 		}
// 	}

// 	return { isLoading: loading, getUser }
// }

// export const getCurrentUser = () => {
// 		const { user, setUser } = useContext(Context)
	

// 	const getUser = async () => {
// 		const response = await axios.get('/api/auth/me')
// 		if (!response.data.ok) {
// 			throw new Error('Failed to fetch user')
// 		}
// 		setUser(response.data.user)
// 	}

// 	return { getUser }
// }
