import axios from 'axios'

export const signUpUser = async (user: { fullName: string; email: string; password: string }) => {
	const response = await axios.post('/api/auth/register', user)
	return response.data
}

export const loginUser = async (user: { email: string; password: string }) => {
	const response = await axios.post('/api/auth/login', user)
	return response.data
}
