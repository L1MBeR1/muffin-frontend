'use client'

import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import ChangeEmailModal from '@/components/modals/changeEmailModal'
import ChangePasswordModal from '@/components/modals/changePasswordModal'

import useProfile from '@/hooks/useProfile'

export default function AccountData() {
	const { data, isLoading } = useProfile()
	const [account, setAccount] = useState({
		email: ''
	})

	useEffect(() => {
		if (data?.email) {
			setAccount({ email: data.email })
		}
	}, [data])
	const [openEmailModal, setOpenEmailModal] = useState(false)
	const [openPasswordModal, setOpenPasswordModal] = useState(false)
	const maskedEmail = (email: string): string => {
		const [localPart, domain] = email.split('@')

		if (!localPart || !domain) {
			return email
		}

		const maskedLocalPart =
			localPart.length > 2
				? `${localPart.slice(0, 2)}${'*'.repeat(localPart.length - 2)}`
				: `${'*'.repeat(localPart.length)}`

		return `${maskedLocalPart}@${domain}`
	}
	return (
		<>
			<ChangeEmailModal
				isOpen={openEmailModal}
				onOpenChange={setOpenEmailModal}
			/>
			<ChangePasswordModal
				isOpen={openPasswordModal}
				onOpenChange={setOpenPasswordModal}
			/>
			<div className='flex flex-col space-y-4'>
				<h2 className='text-3xl'>Данные аккаунта</h2>
				<div className='flex flex-col space-y-2'>
					<h3 className='text-lg'>Почта</h3>
					<div className='flex flex-row items-center space-x-4'>
						<p>{maskedEmail(account.email)}</p>
						<Button
							color='secondary'
							variant='flat'
							onClick={() => {
								setOpenEmailModal(true)
							}}
						>
							Изменить
						</Button>
					</div>
				</div>
				<div className='flex flex-col space-y-2'>
					<h3 className='text-lg'>Пароль</h3>
					<div className='flex-row'>
						<Button
							color='secondary'
							variant='flat'
							onClick={() => {
								setOpenPasswordModal(true)
							}}
						>
							Изменить пароль
						</Button>
					</div>
				</div>
			</div>
		</>
	)
}
