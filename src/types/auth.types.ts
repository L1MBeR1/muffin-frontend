export interface IAuthForm {
	email: string
	password: string
}
export enum EnumGender {
	male = 'male',
	female = 'female'
}

export enum EnumRoles {
	admin = 'admin',
	user = 'user',
	collector = 'collector'
}

export interface IUser {
	id: number
	firstName?: string | null
	lastName?: string | null
	patronymic?: string | null
	email: string
	phone?: string | null
	gender?: EnumGender | null
	isBlocked: boolean
	createdAt: string
	updatedAt: string
	roles: EnumRoles[]
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
