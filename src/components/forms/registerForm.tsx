import { Button, Input } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IAuthForm } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

interface RegisterFormProps {
	onToggle: () => void
}

const RegisterForm = ({ onToggle }: RegisterFormProps) => {
	const { register, handleSubmit, reset } = useForm<IAuthForm>()

	const onSubmit: SubmitHandler<IAuthForm> = async data => {
		try {
			await authService.register(data)
			toast.success('Успешная регистрация!')
			reset()
		} catch (error) {
			toast.error('Ошибка регистрации. Проверьте данные.')
		}
	}

	return (
		<form
			className='flex flex-col gap-3'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input
				label='Почта'
				placeholder='Введите почту'
				{...register('email', { required: true })}
			/>
			<Input
				label='Пароль'
				placeholder='Введите ваш пароль'
				{...register('password', { required: true })}
			/>
			<Button
				color='primary'
				className='full'
				type='submit'
			>
				Зарегистрироваться
			</Button>
		</form>
	)
}

export default RegisterForm
