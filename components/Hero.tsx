import React from 'react'
import { MessageCircle, Video, ArrowRight, Star, CheckCircle } from 'lucide-react'

const Hero = () => {
	return (
		<div className='hero bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden'>
			{/* Background decoration */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow'></div>
				<div className='absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow'></div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow'></div>
			</div>

			<div className='hero-content text-center relative z-10 max-w-6xl mx-auto px-4'>
				<div className='max-w-4xl'>
					{/* Badge */}
					<div className='mb-8'>
						<div className='badge badge-primary badge-lg gap-2 py-3 px-4 text-white font-medium'>
							<Star size={16} className='fill-current' />
							Trusted by 10M+ users worldwide
						</div>
					</div>

					{/* Main heading */}
					<h1 className='text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight'>
						<span className='text-primary'>Making Chat && Stream</span> <br />
						<span className='text-secondary'>Seamlessly</span>
					</h1>

					{/* Subtitle */}
					<p className='text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed'>
						Experience crystal-clear video calls and lightning-fast messaging with end-to-end
						encryption. Connect with friends, family, and colleagues from anywhere in the world.
					</p>

					{/* Feature highlights */}
					<div className='flex flex-wrap justify-center gap-6 mb-10'>
						<div className='flex items-center gap-2 text-gray-700'>
							<CheckCircle size={20} className='text-success' />
							<span className='font-medium'>End-to-end encrypted</span>
						</div>
						<div className='flex items-center gap-2 text-gray-700'>
							<CheckCircle size={20} className='text-success' />
							<span className='font-medium'>HD video quality</span>
						</div>
						<div className='flex items-center gap-2 text-gray-700'>
							<CheckCircle size={20} className='text-success' />
							<span className='font-medium'>Cross-platform</span>
						</div>
					</div>

					{/* CTA buttons */}
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
						<button className='btn btn-primary btn-lg text-white hover:btn-primary-focus transition-all duration-200 group'>
							<Video size={20} />
							Start Video Call
							<ArrowRight size={16} className='group-hover:translate-x-1 transition-transform' />
						</button>
						<button className='btn btn-outline btn-lg hover:btn-primary hover:text-white transition-all duration-200 group'>
							<MessageCircle size={20} />
							Try Messaging
						</button>
					</div>

					{/* Stats */}
					<div className='mt-16 grid grid-cols-2 md:grid-cols-4 gap-8'>
						<div className='stat'>
							<div className='stat-value text-primary text-3xl md:text-4xl font-bold'>10M+</div>
							<div className='stat-desc text-gray-600'>Active Users</div>
						</div>
						<div className='stat'>
							<div className='stat-value text-secondary text-3xl md:text-4xl font-bold'>99.9%</div>
							<div className='stat-desc text-gray-600'>Uptime</div>
						</div>
						<div className='stat'>
							<div className='stat-value text-accent text-3xl md:text-4xl font-bold'>150+</div>
							<div className='stat-desc text-gray-600'>Countries</div>
						</div>
						<div className='stat'>
							<div className='stat-value text-success text-3xl md:text-4xl font-bold'>5-Star</div>
							<div className='stat-desc text-gray-600'>Rating</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Hero
