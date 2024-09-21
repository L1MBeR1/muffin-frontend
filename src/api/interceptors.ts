import axios, { type CreateAxiosDefaults } from 'axios'

import { errorCatch } from './error'
import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosClassic.interceptors.request.use(config => {
	console.log('Classic Request:', config)
	return config
})

axiosClassic.interceptors.response.use(
	response => {
		console.log('Classic Response:', response)
		return response
	},
	error => {
		// Логируем ошибку
		console.log('Classic Error Response:', error)
		throw error
	}
)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	console.log('Auth Request:', config)

	return config
})

axiosWithAuth.interceptors.response.use(
	response => {
		console.log('Auth Response:', response)
		return response
	},
	async error => {
		const originalRequest = error.config

		console.log('Auth Error Response:', error)

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				console.log('Attempting to refresh tokens...')
				await authService.getNewTokens()
				console.log('Tokens refreshed, retrying original request...')
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				console.log('Token refresh failed:', error)
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}
		throw error
	}
)

export { axiosClassic, axiosWithAuth }
