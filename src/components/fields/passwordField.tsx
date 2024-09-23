import { Button, Input } from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface IPasswordInputProps {
	label: string
	placeholder: string
	register: UseFormRegister<any>
	rules?: RegisterOptions
}

export function PasswordInput({
	label,
	placeholder,
	register,
	rules
}: IPasswordInputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	return (
		<Input
			label={label}
			placeholder={placeholder}
			type={isPasswordVisible ? 'text' : 'password'}
			variant='bordered'
			endContent={
				<Button
					isIconOnly
					variant='light'
					onPress={togglePasswordVisibility}
					aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
				>
					{isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
				</Button>
			}
			{...register('password', rules)}
		/>
	)
}
