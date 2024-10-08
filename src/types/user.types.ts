import { EnumGender } from './auth.types'

export interface IProfile {
	firstName?: string | null
	lastName?: string | null
	birthDate?: string | null
	gender?: EnumGender | null
}

export interface IChangeEmail {
	email: string
	oldPassword: string
}
export interface IChangePassword {
	password: string
	newPassword: string
	confirmPassword: string
}
