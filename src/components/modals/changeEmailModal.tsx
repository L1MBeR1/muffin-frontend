'use client'

import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IChangeEmail } from '@/types/user.types'

import { PasswordField } from '../fields/passwordField'

import { userService } from '@/services/user.service'

interface ChangeEmailModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const ChangeEmailModal = ({ isOpen, onOpenChange }: ChangeEmailModalProps) => {
	const queryClient = useQueryClient()
	const { register, handleSubmit, reset } = useForm<IChangeEmail>()
	const [loading, setLoading] = useState(false)
	const [authError, setAuthError] = useState<string | null>(null)

	const { mutate } = useMutation({
		mutationKey: ['changeEmail'],
		mutationFn: (data: IChangeEmail) => userService.updateEmail(data),
		onMutate() {
			setLoading(true)
			setAuthError(null)
		},
		onSuccess() {
			toast.success('Почта успешно изменена')
			reset()
			queryClient.refetchQueries({ queryKey: ['profile'], type: 'active' })
			onOpenChange(false)
		},
		onError(error: any) {
			setAuthError('Ошибка при смене почты. Проверьте данные.')
		},
		onSettled() {
			setLoading(false)
		}
	})

	const onSubmit: SubmitHandler<IChangeEmail> = data => {
		mutate(data)
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				{onClose => (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col gap-3'
					>
						<ModalHeader>Смена почты</ModalHeader>
						<ModalBody>
							{authError && (
								<div className='text-red-500 text-sm'>{authError}</div>
							)}
							<PasswordField
								label='Пароль'
								placeholder='Введите ваш пароль'
								register={register}
								registerName='oldPassword'
								size='lg'
								variant='bordered'
								rules={{
									required: 'Пароль обязателен',
									minLength: {
										value: 6,
										message: 'Пароль должен содержать минимум 6 символов'
									}
								}}
							/>
							<Input
								label='Почта'
								placeholder='Введите новую почту'
								size='lg'
								variant='bordered'
								{...register('email', { required: true })}
							/>
						</ModalBody>
						<ModalFooter className='justify-center'>
							<Button
								color='danger'
								variant='light'
								size='lg'
								onPress={onClose}
							>
								Назад
							</Button>
							<Button
								color='secondary'
								variant='solid'
								type='submit'
								disabled={loading}
								size='lg'
								isLoading={loading}
							>
								Сохранить
							</Button>
						</ModalFooter>
					</form>
				)}
			</ModalContent>
		</Modal>
	)
}

export default ChangeEmailModal
