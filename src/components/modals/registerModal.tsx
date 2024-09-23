import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IAuthForm } from '@/types/auth.types'

import { APP_PAGES } from '@/config/pages-url.config'

import { PasswordInput } from '../fields/passwordField'

import { authService } from '@/services/auth.service'

interface IRegisterModalProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
	toggleModal: () => void // функция для переключения на авторизацию
}

function RegisterModal({
	isOpen,
	onOpenChange,
	toggleModal
}: IRegisterModalProps) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>({
		mode: 'onChange'
	})
	const [loading, setLoading] = useState(false)
	const [authError, setAuthError] = useState<string | null>(null)
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.register(data),
		onMutate() {
			setLoading(true)
			setAuthError(null)
		},
		onSuccess() {
			toast.success('Успешная регистрация!')
			reset()
			push(APP_PAGES.HOME)
			onOpenChange(false)
		},
		onError(error: any) {
			setAuthError('Ошибка при регистрации. Проверьте данные.')
		},
		onSettled() {
			setLoading(false)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			placement='top-center'
		>
			<ModalContent>
				{onClose => (
					<>
						<ModalHeader className='flex flex-col gap-1'>
							Регистрация
						</ModalHeader>
						<ModalBody>
							<form
								className='flex flex-col gap-3'
								onSubmit={handleSubmit(onSubmit)}
							>
								<Input
									autoFocus
									label='Почта'
									placeholder='Введите почту'
									variant='bordered'
									{...register('email', {
										required: 'Email обязателен',
										pattern: {
											value: /^\S+@\S+$/i,
											message: 'Некорректный email'
										}
									})}
								/>
								<PasswordInput
									label='Пароль'
									placeholder='Введите ваш пароль'
									register={register}
									rules={{
										required: 'Пароль обязателен',
										minLength: {
											value: 6,
											message: 'Пароль должен содержать минимум 6 символов'
										}
									}}
								/>
								{authError && (
									<div className='text-red-500 text-sm'>{authError}</div>
								)}
								<Button
									type='submit'
									className='full'
									color='primary'
									isLoading={loading}
								>
									Зарегистрироваться
								</Button>
							</form>
						</ModalBody>
						<ModalFooter className='justify-center'>
							<Button
								color='primary'
								variant='light'
								onPress={toggleModal}
							>
								Уже есть аккаунт? Войти
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	)
}

export default RegisterModal
