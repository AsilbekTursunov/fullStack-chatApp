import React, { ReactNode } from 'react'
import Sidebar from './_components/Sidebar'
import Navbar from './_components/Navbar'

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className='min-h-screen flex flex-row'>
			{<Sidebar />}
			<div className='flex flex-1 flex-col'>
				<Navbar />
				<main className='flex-1 p-3'>{children}</main>
			</div>
		</div>
	)
}

export default RootLayout
