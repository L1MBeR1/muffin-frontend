'use client'

import { Button, Listbox, ListboxItem } from '@nextui-org/react'
import { useState } from 'react'

import LogoutModal from '@/components/modals/logoutModal'

export default function ProfileList() {
	const [openModal, setOpenModal] = useState(false)
	return (
		<>
			<LogoutModal
				isOpen={openModal}
				onOpenChange={setOpenModal}
			/>
			<Listbox
				variant='flat'
				disallowEmptySelection
				selectionMode='single'
			>
				<ListboxItem
					key='profile'
					href='/profile/personal'
				>
					Профиль
				</ListboxItem>
				<ListboxItem
					key='orders'
					href='/profile/orders'
				>
					Заказы
				</ListboxItem>
				<ListboxItem
					key='settings'
					href='/profile/settings'
				>
					Настройки
				</ListboxItem>
				<ListboxItem key='exit'>
					<Button
						onClick={() => {
							setOpenModal(true)
						}}
					>
						Выйти
					</Button>
				</ListboxItem>
			</Listbox>
		</>
	)
}
