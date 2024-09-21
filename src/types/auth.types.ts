export interface IAuthForm {
	email: string
	password: string
}
export enum EnumGender {
	male = 'male',
	female = 'female'
}

export interface IUser {
	id: number
	firstName: string
	lastName: string
	patronymic: string
	phone: string
	gender: EnumGender
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}
