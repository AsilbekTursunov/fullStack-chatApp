'use client'
import { useState } from 'react'
import { EyeIcon, EyeOffIcon, ShipWheelIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { signUpUser } from '@/lib/api'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useUserContext } from '@/hooks/useUserContext'

const RegisterPage = () => {
	const [show, setShow] = useState(false)
	const [showModal, setshowModal] = useState(false)
	const [otpCode, setOtpCode] = useState('')
	const router = useRouter()

	const { refetch } = useUserContext()
	const [signupData, setSignupData] = useState({
		fullName: '',
		email: '',
		password: '',
		code: (Math.random() * 1000000).toString().slice(0, 5),
	})

	const { mutate, isPending, error } = useMutation({
		mutationFn: signUpUser,
		onSuccess: () => {
			setshowModal(true)
		},
		onError(err) {
			console.log('register error', err)
		},
	})

	const { mutate: verifyMutation, isPending: verifyPending } = useMutation({
		mutationFn: async () => {
			const response = await axios.post('/api/auth/verify', {
				email: signupData.email,
			})
			return response.data
		},
		onSuccess(data) {
			if (data && data.user.isOnboarded) {
				router.push('/dashboard')
			} else if (data && !data.user.isOnboarded) {
				router.push('/onboarding')
			}
			refetch()
		},
	})

	const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setTimeout(() => {
			mutate(signupData)
		}, 1000)
	}

	console.log(signupData.code)
	console.log(otpCode)

	return (
		<>
			<div className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'>
				<div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
					{/* SIGNUP FORM - LEFT SIDE */}
					<div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
						{/* LOGO */}
						<div className='mb-4 flex items-center justify-start gap-2'>
							<ShipWheelIcon className='size-9 text-primary' />
							<span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
								Chatty
							</span>
						</div>

						{/* ERROR MESSAGE IF ANY */}
						{error && (
							<div className='alert alert-error mb-4'>
								<span>
									{(axios.isAxiosError(error) && error.response?.data?.message) ||
										error?.message ||
										'An error occurred.'}
								</span>
							</div>
						)}

						<div className='w-full'>
							<form onSubmit={handleSignup}>
								<div className='space-y-4'>
									<div>
										<h2 className='text-xl font-semibold'>Create an Account</h2>
										<p className='text-sm opacity-70'>
											Join Chatty and start your language learning adventure!
										</p>
									</div>

									<div className='space-y-3'>
										{/* FULLNAME */}
										<div className='form-control w-full'>
											<label className='label'>
												<span className='label-text'>Full Name</span>
											</label>
											<input
												type='text'
												placeholder='John Doe'
												className='input input-bordered w-full'
												value={signupData.fullName}
												onChange={e => setSignupData({ ...signupData, fullName: e.target.value })}
												required
											/>
										</div>
										{/* EMAIL */}
										<div className='form-control w-full'>
											<label className='label'>
												<span className='label-text'>Email</span>
											</label>
											<input
												type='email'
												placeholder='john@gmail.com'
												className='input input-bordered w-full'
												value={signupData.email}
												onChange={e => setSignupData({ ...signupData, email: e.target.value })}
											/>
										</div>
										{/* PASSWORD */}
										<div className='form-control w-full '>
											<label className='label'>
												<span className='label-text'>Password</span>
											</label>
											<div className='relative'>
												<input
													type={show ? 'text' : 'password'}
													placeholder='********'
													className='input input-bordered w-full'
													value={signupData.password}
													onChange={e => setSignupData({ ...signupData, password: e.target.value })}
													required
												/>
												<span
													onClick={() => setShow(!show)}
													className='absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer'
												>
													{show ? (
														<EyeOffIcon className='h-5 w-5 text-gray-400' />
													) : (
														<EyeIcon className='h-5 w-5 text-gray-400' />
													)}
												</span>
											</div>
											<p className='text-xs opacity-70 mt-1'>
												Password must be at least 6 characters long
											</p>
										</div>

										<div className='form-control'>
											<label className='label cursor-pointer justify-start gap-2'>
												<input type='checkbox' className='checkbox checkbox-sm' required />
												<span className='text-xs leading-tight'>
													I agree to the{' '}
													<span className='text-primary hover:underline'>terms of service</span> and{' '}
													<span className='text-primary hover:underline'>privacy policy</span>
												</span>
											</label>
										</div>
									</div>

									<button className='btn btn-primary w-full' type='submit'>
										{isPending ? (
											<>
												<span className='loading loading-spinner loading-xs'></span>
												Loading...
											</>
										) : (
											'Create Account'
										)}
									</button>

									<div className='text-center mt-4'>
										<p className='text-sm'>
											Already have an account?{' '}
											<Link href='/login' className='text-primary hover:underline'>
												Sign in
											</Link>
										</p>
									</div>
								</div>
							</form>
						</div>
					</div>

					{/* SIGNUP FORM - RIGHT SIDE */}
					<div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
						<div className='max-w-md p-8'>
							{/* Illustration */}
							<div className='relative aspect-square max-w-sm mx-auto'>
								<img
									src='/signup.png'
									alt='Language connection illustration'
									className='w-full h-full'
								/>
							</div>

							<div className='text-center space-y-3 mt-6'>
								<h2 className='text-xl font-semibold'>Connect with language partners worldwide</h2>
								<p className='opacity-70'>
									Practice conversations, make friends, and improve your language skills together
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`fixed z-50 top-0 bottom-0 bg-neutral-900/90 w-screen h-screen  items-center justify-center ${showModal ? 'flex' : 'hidden'}`}
			>
				<div className='flex flex-col px-16 py-14 text-base relative leading-6 bg-white shadow-sm max-w-[540px] max-md:px-5 rounded-xl'>
					<span
						onClick={() => setshowModal(false)}
						className=' absolute -right-5 -top-4 size-5 text-white cursor-pointer'
					>
						<X />
					</span>
					<div className='self-center text-3xl font-bold leading-10 text-center text-gray-900'>
						Confirm Email
					</div>
					<div className='flex gap-2 self-center mt-6 text-center'>
						<div className='text-gray-500'>Check Your Email and Enter Confirmation Code</div>
					</div>
					<div className='mt-12 text-sm leading-5 text-gray-500 max-md:mt-10'>
						Confirmation Code
					</div>
					<input
						type='text'
						className='justify-center items-start mt-2.5 bg-white rounded border border-solid border-slate-200 text-slate-400 max-md:pr-5 px-4 py-5'
						placeholder='Enter Code'
						onChange={event => setOtpCode(event.target.value)}
						required
					/>
					<button
						className={` ${signupData.code != otpCode ? ' bg-blue-200 cursor-not-allowed' : 'bg-blue-600 cursor-pointer'} justify-center items-center px-16 py-5 mt-6 text-white  rounded max-md:px-5`}
						onClick={() => verifyMutation()}
					>
						{verifyPending ? (
							<>
								<span className='loading loading-spinner loading-xs'></span>
								Sending...
							</>
						) : (
							'Confirm Email'
						)}
					</button>
					<div className='mt-7 h-px bg-zinc-200' />
					<div className='self-center mt-7 text-sm leading-5 text-center text-gray-500'>
						Haven't received your code?
					</div>
					{/* <button
						className='flex justify-center items-center px-16 py-3 mt-7 text-blue-600 bg-white rounded border border-solid border-zinc-200 max-md:px-5'
						onClick={handleResendCode}
					>
						Resend Code
					</button> */}
				</div>
				{/* <div className='bg-white rounded-lg p-4 flex flex-col gap-2'>
					<input
						type='number'
						onChange={event => setOtpCode(event.target.value)}
						className='p-3 rounded-md outline-0 border-neutral-200 border text-center text-black'
					/>
					<button
						disabled={signupData.code != otpCode}
						onClick={() => verifyMutation()}
						className='w-full p-3 bg-green-500 text-white text-xl text-center '
					>
						Verify
					</button>
				</div> */}
			</div>
		</>
	)
}

export default RegisterPage
