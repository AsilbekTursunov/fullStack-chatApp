import { LANGUAGE_TO_FLAG } from '@/constants'
import Image from 'next/image'
import React, { ReactNode } from 'react'

const CButton = ({ children, className }: { children: ReactNode; className: string }) => {
	return (
		<div className={`cursor-pointer bg-transparent p-0 m-0  hover:bg-transparent ${className}`}>
			{children}
		</div>
	)
}

export default CButton

export function getLanguageFlag(language: string) {
	if (!language) return null

	const langLower = language.toLowerCase()
	const countryCode = (LANGUAGE_TO_FLAG as Record<string, string>)[langLower]

	if (countryCode) {
		return (
			<Image
				src={`https://flagcdn.com/24x18/${countryCode}.png`}
				alt={`${langLower} flag`}
				width={1000}
				height={1000}
				className='h-3 mr-1 inline-block size-6'
			/>
		)
	}
	return null
}
