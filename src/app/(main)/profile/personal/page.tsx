import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import AccountData from './accountData'
import ProfileData from './profileData'

export const metadata: Metadata = {
	title: 'Профиль',
	...NO_INDEX_PAGE
}

export default function Personal() {
	return (
		<div
			className='flex flex-col p-5 rounded-2xl space-y-8 max-w-2xl w-full'
			// style={{ backgroundColor: '#ffefe0' }}
		>
			<ProfileData />
			<AccountData />
		</div>
	)
}
