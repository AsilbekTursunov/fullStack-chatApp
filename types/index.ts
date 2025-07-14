export interface IFriend {
	id: string
	fullName: string
	profilePic: string
	nativeLanguage: string
	learningLanguage: string
	location: string
}

export interface IUser {
	fullName: string
	email: string
	password: string
	bio: string
	profilePic: string
	nativeLanguage: string
	learningLanguage: string
	location: string
	isOnboarded: string
	friends: string[]
	id: string
}
