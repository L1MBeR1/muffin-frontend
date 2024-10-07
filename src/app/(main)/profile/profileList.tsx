'use client'

import { Button, Divider, Tab, Tabs } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import LogoutModal from '@/components/modals/logoutModal'

export default function ProfileTabs() {
	const [openModal, setOpenModal] = useState(false)
	const pathname = usePathname()

	return (
		<div
			className='w-96 space-y-4 p-5 rounded-2xl h-fit'
			style={{ backgroundColor: 'hsl(var(--nextui-surface))' }}
		>
			<LogoutModal
				isOpen={openModal}
				onOpenChange={setOpenModal}
			/>
			<Tabs
				classNames={{
					tabList: 'bg-transparent'
				}}
				aria-label='Profile Options'
				selectedKey={pathname}
				isVertical={true}
				color='primary'
				fullWidth={true}
				size={'lg'}
			>
				<Tab
					className='justify-start'
					key='/profile/personal'
					title='Профиль'
					href='/profile/personal'
				/>
				<Tab
					className='justify-start'
					key='/profile/orders'
					title='Заказы'
					href='/profile/orders'
				/>
				<Tab
					className='justify-start'
					key='/profile/settings'
					title='Настройки'
					href='/profile/settings'
				/>
			</Tabs>
			<Divider />
			<Button
				className='w-full'
				color='danger'
				variant='flat'
				size='md'
				onClick={() => {
					setOpenModal(true)
				}}
			>
				Выйти
			</Button>
		</div>
	)
}
