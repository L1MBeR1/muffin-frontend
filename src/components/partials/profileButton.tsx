'use client'

import { Button, CircularProgress } from '@nextui-org/react'
import { User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import useProfile from '@/hooks/useProfile'

import AuthModal from '../modals/authModal'

export function ProfileButton() {
	const [openModal, setOpenModal] = useState(false)
	const { data, isLoading, isFetching } = useProfile()
	const { push } = useRouter()

	const handleButtonClick = () => {
		console.log(data)
		if (data) {
			push('/profile/personal')
		} else {
			setOpenModal(true)
		}
	}

	return (
		<>
			<AuthModal
				isOpen={openModal}
				onOpenChange={setOpenModal}
			/>
			{isFetching ? (
				<CircularProgress
					size='sm'
					aria-label='Loading...'
				/>
			) : (
				<Button
					isIconOnly
					color='primary'
					variant='light'
					onClick={() => {
						handleButtonClick()
					}}
				>
					<User />
				</Button>
			)}
		</>
	)
}
