'use client'
import { LANGUAGES } from '@/constants'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Context } from '../../UserProvider'
import { useRouter } from 'next/navigation'
import { getRandomImage } from '@/lib/util'
import Image from 'next/image'

const OnBoardingPage = () => {
	const { isLoading, user: authUser, setUser } = useContext(Context)
	const [image, setImage] = useState<string>('')
	const router = useRouter()
	const [formState, setFormState] = React.useState({
		fullName: authUser?.fullName || '',
		profilePic: authUser?.profilePic || '',
		bio: authUser?.bio || '',
		nativeLanguage: authUser?.nativeLanguage || '',
		learningLanguage: authUser?.learningLanguage || '',
		location: authUser?.location || '',
	})

	useEffect(() => {
		if (authUser && authUser.isOnboarded) {
			router.push('/dashboard')
		} else if (!authUser) {
			router.push('/login')
		}
	}, [])

	const { mutate: onboardingMutation, isPending } = useMutation({
		mutationFn: async () => {
			const response = await axios.post('/api/auth/onboarding', {
				...formState,
				profilePic: image,
				userId: authUser?.id,
			})
			return response.data
		},
		retry: false,
		onSuccess(data) {
			toast.success('Onboarding completed successfully!')
			setUser(data.user)
			router.push('/dashboard')
		},
	})

	const handleOnboarding = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		onboardingMutation()
	}

	const handleRandomAvatar = () => {
		const randomAvatar = getRandomImage(authUser?.fullName!)
		setImage(randomAvatar)
		setFormState(prev => ({ ...prev, profilePic: randomAvatar }))
		toast.success('Random profile picture generated!')
	}

	return (
		<div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
			<div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
				<div className='card-body p-6 sm:p-8'>
					<h1 className='text-2xl sm:text-3xl font-bold text-center mb-3'>Complete Your Profile</h1>

					<form onSubmit={handleOnboarding} className='space-y-2'>
						{/* PROFILE PIC CONTAINER */}
						<div className='flex flex-col items-center justify-center space-y-2'>
							{/* IMAGE PREVIEW */}
							<Image
								src={'/images/45.jpeg'}
								alt='Profile Preview'
								className='object-cover size-4'
								width={1000}
								height={1000}
							/>
							<div className='size-32 rounded-full bg-base-300 overflow-hidden'>
								{formState.profilePic ? (
									<Image
										src={formState.profilePic}
										alt='Profile Preview'
										className='w-full h-full object-cover size-7'
										width={1000}
										height={1000}
									/>
								) : (
									<div className='flex items-center justify-center h-full'>
										<CameraIcon className='size-12 text-base-content opacity-40' />
									</div>
								)}
							</div>

							{/* Generate Random Avatar BTN */}
							<div className='flex items-center gap-2'>
								<button type='button' onClick={handleRandomAvatar} className='btn btn-accent'>
									<ShuffleIcon className='size-4 mr-2' />
									Generate Random Avatar
								</button>
							</div>
						</div>

						{/* FULL NAME */}
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Full Name</span>
							</label>
							<input
								type='text'
								name='fullName'
								value={formState.fullName}
								onChange={e => setFormState({ ...formState, fullName: e.target.value })}
								className='input input-bordered w-full'
								placeholder='Your full name'
							/>
						</div>

						{/* BIO */}
						<div className='form-control flex flex-col w-full'>
							<label className='label'>
								<span className='label-text'>Bio</span>
							</label>
							<textarea
								name='bio'
								value={formState.bio}
								onChange={e => setFormState({ ...formState, bio: e.target.value })}
								className='textarea textarea-bordered h-24 w-full'
								placeholder='Tell others about yourself and your language learning goals'
							/>
						</div>

						{/* LANGUAGES */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{/* NATIVE LANGUAGE */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Native Language</span>
								</label>
								<select
									name='nativeLanguage'
									value={formState.nativeLanguage}
									onChange={e => setFormState({ ...formState, nativeLanguage: e.target.value })}
									className='select select-bordered w-full'
								>
									<option value=''>Select your native language</option>
									{LANGUAGES.map(lang => (
										<option key={`native-${lang}`} value={lang.toLowerCase()}>
											{lang}
										</option>
									))}
								</select>
							</div>

							{/* LEARNING LANGUAGE */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Learning Language</span>
								</label>
								<select
									name='learningLanguage'
									value={formState.learningLanguage}
									onChange={e => setFormState({ ...formState, learningLanguage: e.target.value })}
									className='select select-bordered w-full'
								>
									<option value=''>Select language you're learning</option>
									{LANGUAGES.map(lang => (
										<option key={`learning-${lang}`} value={lang.toLowerCase()}>
											{lang}
										</option>
									))}
								</select>
							</div>
						</div>

						{/* LOCATION */}
						<div className='form-control'>
							<label className='label'>
								<span className='label-text'>Location</span>
							</label>
							<div className='relative'>
								<MapPinIcon className='absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70' />
								<input
									type='text'
									name='location'
									value={formState.location}
									onChange={e => setFormState({ ...formState, location: e.target.value })}
									className='input input-bordered w-full pl-10'
									placeholder='City, Country'
								/>
							</div>
						</div>

						{/* SUBMIT BUTTON */}

						<button className='btn btn-primary w-full mt-4' disabled={isPending} type='submit'>
							{!isPending ? (
								<>
									<ShipWheelIcon className='size-5 mr-2' />
									Complete Onboarding
								</>
							) : (
								<>
									<LoaderIcon className='animate-spin size-5 mr-2' />
									Onboarding...
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default OnBoardingPage
