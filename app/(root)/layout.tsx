import React, { ReactNode } from 'react'
import UserProvider from './UserProvider'

const RootLayout = ({ children }: { children: ReactNode }) => {
	return <UserProvider>{children}</UserProvider>
}

export default RootLayout
