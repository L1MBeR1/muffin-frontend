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
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>()

	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.register(data),
		onMutate() {
			setLoading(true)
			setError(null)
		},
		onSuccess() {
			toast.success('Успешная регистрация!')
			reset()
			push(APP_PAGES.HOME)
			onOpenChange(false)
			queryClient.refetchQueries({ queryKey: ['profile'], type: 'active' })
		},
		onError(error: any) {
			setError('Ошибка при регистрации. Проверьте данные.')
		},
		onSettled() {
			setLoading(false)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		if (!data.email || !data.password || !data.confirmPassword) {
			setError('Пожалуйста, заполните все поля.')
			return
		}
		if (data.password !== data.confirmPassword) {
			setError('Пароли не совпадают')
			return
		}
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
				{...register('email', { required: 'Почта обязательна' })}
				isInvalid={!!errors.email}
			/>
			<div className='space-y-2'>
				<PasswordField
					label='Пароль'
					placeholder='Введите ваш пароль'
					register={register}
					registerName='password'
					size={'lg'}
					variant={'bordered'}
					isInvalid={!!errors.password}
					rules={{
						required: 'Пароль обязателен',
						minLength: {
							value: 6,
							message: 'Пароль должен содержать минимум 6 символов'
						}
					}}
				/>
				<div className='pl-2 text-sm'>
					<p>Пароль должен содержать минимум 6 символов</p>
				</div>
			</div>
			<PasswordField
				label='Повторите пароль'
				placeholder='Введите пароль снова'
				register={register}
				registerName='confirmPassword'
				size={'lg'}
				variant={'bordered'}
				isInvalid={!!errors.confirmPassword}
				rules={{
					required: 'Повтор пароля обязателен',
					minLength: {
						value: 6,
						message: 'Пароль должен содержать минимум 6 символов'
					}
				}}
			/>
			{error && <p className='text-red-600'>{error}</p>}{' '}
			<Button
				color='secondary'
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
