import { Button, Input } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IAuthForm } from '@/types/auth.types'

import { APP_PAGES } from '@/config/pages-url.config'

import { PasswordField } from '../fields/passwordField'

import { authService } from '@/services/auth.service'

interface RegisterFormProps {
	onToggle: () => void
	onOpenChange: (open: boolean) => void
}

const RegisterForm = ({ onToggle, onOpenChange }: RegisterFormProps) => {
	const { register, handleSubmit, reset } = useForm<IAuthForm>()

	const queryClient = useQueryClient()
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
			queryClient.refetchQueries({ queryKey: ['profile'], type: 'active' })
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
		<form
			className='flex flex-col gap-3'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				label='Почта'
				placeholder='Введите почту'
				size={'lg'}
				variant={'bordered'}
				{...register('email', { required: true })}
			/>
			<PasswordField
				label='Пароль'
				placeholder='Введите ваш пароль'
				register={register}
				registerName='password'
				size={'lg'}
				variant={'bordered'}
				rules={{
					required: 'Пароль обязателен',
					minLength: {
						value: 6,
						message: 'Пароль должен содержать минимум 6 символов'
					}
				}}
			/>
			<Button
				color='primary'
				className='full'
				type='submit'
				size={'lg'}
				isLoading={loading}
			>
				Зарегистрироваться
			</Button>
		</form>
	)
}

export default RegisterForm
