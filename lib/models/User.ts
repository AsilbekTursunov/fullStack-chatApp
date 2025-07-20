import mongoose, { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		bio: {
			type: String,
			default: '',
		},
		profilePic: {
			type: String,
			default: '',
		},
		nativeLanguage: {
			type: String,
			default: '',
		},
		learningLanguage: {
			type: String,
			default: '',
		},
		location: {
			type: String,
			default: '',
		},
		isOnboarded: {
			type: Boolean,
			default: false,
		},
		verified: {
			type: Boolean,
			default: false,
		},
		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ timestamps: true }
)

const User = models.User || model('User', userSchema)
export default User
