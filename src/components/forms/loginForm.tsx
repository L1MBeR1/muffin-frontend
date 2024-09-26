import { Button, Input } from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IAuthForm } from '@/types/auth.types'

import { APP_PAGES } from '@/config/pages-url.config'

import { PasswordInput } from '../fields/passwordField'

import { authService } from '@/services/auth.service'

interface LoginFormProps {
	onToggle: () => void
	onOpenChange: (open: boolean) => void
}

const LoginForm = ({ onToggle, onOpenChange }: LoginFormProps) => {
	const queryClient = useQueryClient()
	const { register, handleSubmit, reset } = useForm<IAuthForm>()
	const [loading, setLoading] = useState(false)
	const [authError, setAuthError] = useState<string | null>(null)
	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.login(data),
		onMutate() {
			setLoading(true)
			setAuthError(null)
		},
		onSuccess() {
			toast.success('Успешный вход в аккаунт!')
			reset()
			push(APP_PAGES.HOME)
			onOpenChange(false)
			queryClient.refetchQueries({ queryKey: ['profile'], type: 'active' })
		},
		onError(error: any) {
			setAuthError('Ошибка при входе. Проверьте данные.')
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
			<PasswordInput
				label='Пароль'
				placeholder='Введите ваш пароль'
				register={register}
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
			{authError && <div className='text-red-500 text-sm'>{authError}</div>}
			<Button
				className='full'
				color='primary'
				type='submit'
				size='lg'
				isLoading={loading}
			>
				Войти
			</Button>
		</form>
	)
}

export default LoginForm
