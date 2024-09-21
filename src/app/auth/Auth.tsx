'use client'

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IAuthForm } from '@/types/auth.types'

import { APP_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export function Auth() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const [isLoginForm, setIsLoginForm] = useState(false)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Successfully login!')
			reset()
			push(APP_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div>
			<form
				className='w-1/4 m-auto shadow'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<Input
						label='Email'
						{...register('email', {
							required: 'Email is required',
							pattern: {
								value: /^\S+@\S+$/i,
								message: 'Invalid email address'
							}
						})}
					/>
				</div>

				<div>
					<Input
						label='Password'
						type='password'
						{...register('password', { required: 'Password is required' })}
					/>
				</div>

				<div className='flex items-center gap-5 justify-center'>
					<Button
						type='submit'
						onClick={() => setIsLoginForm(true)}
					>
						login
					</Button>
					<Button
						type='submit'
						onClick={() => setIsLoginForm(false)}
					>
						reg
					</Button>
				</div>
			</form>
		</div>
	)
}
