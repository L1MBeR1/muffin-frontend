import {
	Button,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader
} from '@nextui-org/react'
import { useState } from 'react'

import LoginForm from '../forms/loginForm'
import RegisterForm from '../forms/registerForm'

interface AuthModalContainerProps {
	isOpen: boolean
	onOpenChange: (open: boolean) => void
}

const AuthModalContainer = ({
	isOpen,
	onOpenChange
}: AuthModalContainerProps) => {
	const [isLoginForm, setIsLoginForm] = useState(true)

	const toggleForm = () => {
		setIsLoginForm(prev => !prev)
	}

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
		>
			<ModalContent>
				<ModalHeader>
					{isLoginForm ? 'Вход в аккаунт' : 'Регистрация'}
				</ModalHeader>
				<ModalBody>
					{isLoginForm ? (
						<LoginForm
							onToggle={toggleForm}
							onOpenChange={onOpenChange}
						/>
					) : (
						<RegisterForm onToggle={toggleForm} />
					)}
				</ModalBody>
				<ModalFooter className='justify-center'>
					<Button
						color='primary'
						variant='light'
						onClick={toggleForm}
					>
						{isLoginForm ? 'Зарегистрироваться' : 'Войти в аккаунт'}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default AuthModalContainer
