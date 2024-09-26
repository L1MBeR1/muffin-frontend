'use client'

import { DatePicker, Input } from '@nextui-org/react'

import useProfile from '@/hooks/useProfile'

export default function ProfileData() {
	const { data, isLoading } = useProfile()
	return (
		<div className='flex flex-col'>
			<Input />
			<Input />
			<DatePicker />
			<Input />
			<Input />
		</div>
	)
}
