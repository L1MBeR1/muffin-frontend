import { Button } from '@nextui-org/react'
import { User } from 'lucide-react'
import { useState } from 'react'

import AuthModal from '../modals/authModal'

export function ProfileButton() {
	const [openModal, setOpenModal] = useState(false)

	return (
		<>
			<AuthModal
				isOpen={openModal}
				onOpenChange={setOpenModal}
			/>
			<Button
				isIconOnly
				color='primary'
				variant='light'
				onClick={() => {
					setOpenModal(true)
				}}
			>
				<User />
			</Button>
		</>
	)
}
