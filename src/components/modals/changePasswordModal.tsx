'use client'

import {
	Button,
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

import { IChangePassword } from '@/types/user.types'

import { PasswordField } from '../fields/passwordField'

import { userService } from '@/services/user.service'

interface ChangePasswordModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const ChangePasswordModal = ({
	isOpen,
	onOpenChange
}: ChangePasswordModalProps) => {
	const queryClient = useQueryClient()
	const { register, handleSubmit, reset } = useForm<IChangePassword>()
	const [loading, setLoading] = useState(false)
	const [authError, setAuthError] = useState<string | null>(null)

	const { mutate } = useMutation({
		mutationKey: ['changePassword'],
		mutationFn: (data: IChangePassword) => userService.updatePassword(data),
		onMutate() {
			setLoading(true)
			setAuthError(null)
		},
		onSuccess() {
			toast.success('Пароль успешно изменен')
			reset()
			queryClient.refetchQueries({ queryKey: ['profile'], type: 'active' })
			onOpenChange(false)
		},
		onError(error: any) {
			setAuthError('Ошибка при смене пароля. Проверьте данные.')
		},
		onSettled() {
			setLoading(false)
		}
	})

	const onSubmit: SubmitHandler<IChangePassword> = data => {
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
						<ModalHeader>Смена пароля</ModalHeader>
						<ModalBody>
							{authError && (
								<div className='text-red-500 text-sm'>{authError}</div>
							)}
							<PasswordField
								label='Старый пароль'
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
							<PasswordField
								label='Новый пароль'
								placeholder='Введите ваш новый пароль'
								register={register}
								registerName='newPassword'
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
							<PasswordField
								label='Повторите пароль'
								placeholder='Введите ваш пароль'
								register={register}
								registerName='confirmPassword'
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

export default ChangePasswordModal
