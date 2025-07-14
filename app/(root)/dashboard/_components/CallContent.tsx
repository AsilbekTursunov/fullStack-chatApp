'use client'
import {
	CallControls,
	CallingState,
	SpeakerLayout,
	StreamTheme,
	useCallStateHooks,
} from '@stream-io/video-react-sdk'
import { redirect } from 'next/navigation' 

export const CallContent = () => {
	const { useCallCallingState } = useCallStateHooks()
	const callingState = useCallCallingState()

	if (callingState === CallingState.LEFT) return redirect('/')

	return (
		<StreamTheme>
			<SpeakerLayout />
			<CallControls />
		</StreamTheme>
	)
}
