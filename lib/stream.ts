// lib/stream.ts
import { StreamChat } from 'stream-chat'
import { STREAM_API_KEY } from './util'

export const streamClient = StreamChat.getInstance(STREAM_API_KEY)
