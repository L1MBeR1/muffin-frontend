import { IUser } from '@/types/auth.types'
import { IChangeEmail, IChangePassword, IProfile } from '@/types/user.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
	private BASE_URL = '/user/profile'

	async getProfile() {
		try {
			const response = await axiosWithAuth.get<IUser>(this.BASE_URL)
			return response.data || null
		} catch {
			return null
		}
	}
	async updateProfile(profile: IProfile) {
		const response = await axiosWithAuth.put(this.BASE_URL, profile)
		return response.data
	}

	async updateEmail(profile: IChangeEmail) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/email`, profile)
		return response.data
	}
	async updatePassword(profile: IChangePassword) {
		const response = await axiosWithAuth.put(
			`${this.BASE_URL}/password`,
			profile
		)
		return response.data
	}
}

export const userService = new UserService()
