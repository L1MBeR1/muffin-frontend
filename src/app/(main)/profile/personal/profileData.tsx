'use client'

import { DateValue, getLocalTimeZone } from '@internationalized/date'
import { Button, Input } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

import DateField from '@/components/fields/dateField'

import { EnumGender } from '@/types/auth.types'

import useProfile from '@/hooks/useProfile'

import GenderSelector from './genderSelect'
import { userService } from '@/services/user.service'

export default function ProfileData() {
	const { data, isLoading } = useProfile()
	const [profile, setProfile] = useState({
		firstName: data?.firstName ?? '',
		lastName: data?.lastName ?? '',
		birthDate: data?.birthDate ?? null,
		gender: data?.gender ?? null
	})

	const [isEdited, setIsEdited] = useState(false)

	useEffect(() => {
		setProfile({
			firstName: data?.firstName ?? '',
			lastName: data?.lastName ?? '',
			birthDate: data?.birthDate ?? null,
			gender: data?.gender ?? null
		})
	}, [data])

	useEffect(() => {
		// Проверяем, изменились ли данные
		const isProfileChanged =
			profile.firstName !== data?.firstName ||
			profile.lastName !== data?.lastName ||
			profile.birthDate !== data?.birthDate ||
			profile.gender !== data?.gender

		setIsEdited(isProfileChanged)
	}, [profile, data])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setProfile(prev => ({ ...prev, [name]: value }))
	}

	const handleDateChange = (date: DateValue | null) => {
		setProfile(prev => ({
			...prev,
			birthDate: date ? date.toDate(getLocalTimeZone()).toISOString() : null
		}))
	}

	const handleGenderChange = (gender: EnumGender) => {
		setProfile(prev => ({ ...prev, gender }))
	}

	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)

	const { mutate } = useMutation({
		mutationKey: ['updateProfile'],
		mutationFn: () => userService.updateProfile(profile),
		onMutate() {
			setLoading(true)
		},
		onSuccess() {
			toast.success('Данные успешно обновлены')
			queryClient.refetchQueries({ queryKey: ['profile'] })
			setIsEdited(false)
		},
		onError(error: any) {
			toast.error('Ошибка при обновлении данных')
		},
		onSettled() {
			setLoading(false)
		}
	})

	const handleSave = () => {
		mutate()
	}

	const handleCancel = () => {
		setProfile({
			firstName: data?.firstName ?? '',
			lastName: data?.lastName ?? '',
			birthDate: data?.birthDate ?? null,
			gender: data?.gender ?? null
		})
		setIsEdited(false)
	}

	return (
		<>
			<div className='flex flex-col space-y-4'>
				<h2 className='text-3xl'>Личные данные</h2>
				<Input
					size='lg'
					variant='bordered'
					label='Имя'
					name='firstName'
					placeholder='Введите своё имя'
					value={profile.firstName}
					onChange={handleChange}
					isDisabled={loading}
				/>
				<Input
					size='lg'
					variant='bordered'
					label='Фамилия'
					name='lastName'
					placeholder='Введите свою фамилию'
					value={profile.lastName}
					onChange={handleChange}
					isDisabled={loading}
				/>
				<DateField
					size='lg'
					variant='bordered'
					isoDate={profile.birthDate}
					onChange={handleDateChange}
				/>
				<GenderSelector
					onChange={handleGenderChange}
					selectedGender={profile.gender}
				/>{' '}
				{isEdited && (
					<div className='flex space-x-4'>
						<Button
							onClick={handleSave}
							isDisabled={loading}
							color='primary'
						>
							Сохранить
						</Button>
						<Button
							onClick={handleCancel}
							variant='flat'
							color='danger'
						>
							Отменить
						</Button>
					</div>
				)}
			</div>
		</>
	)
}
