import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ProfileData from './personalData'

export const metadata: Metadata = {
	title: 'Профиль',
	...NO_INDEX_PAGE
}

export default function Personal() {
	return (
		<div className='flex flex-col'>
			<h2>Личные данные</h2>
			<ProfileData />
			<h2>Данные аккаунта</h2>
		</div>
	)
}
