// lib/stream.ts
import { StreamChat } from 'stream-chat'

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!

export const streamClient = StreamChat.getInstance(STREAM_API_KEY)
