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
				<div className='flex flex-col'>
					<h3>Почта</h3>
					<div className='flex-row'>
						{maskedEmail(account.email)}
						<Button
							onClick={() => {
								setOpenEmailModal(true)
							}}
						>
							Изменить
						</Button>
					</div>
				</div>
				<div className='flex flex-col'>
					<h3>Пароль</h3>
					<div className='flex-row'>
						<Button
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
