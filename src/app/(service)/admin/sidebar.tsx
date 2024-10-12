'use client'

import { Button, Skeleton, Tab, Tabs, User } from '@nextui-org/react'
import { LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import useProfile from '@/hooks/useProfile'

export default function Sidebar() {
	const [openModal, setOpenModal] = useState(false)
	const { data, isLoading, isFetching } = useProfile()
	const pathname = usePathname()

	return (
		<div className='w-72 space-y-4 rounded-2xl h-fit'>
			<Tabs
				disabledKeys={[
					'/admin/products',
					'/admin/orders',
					'/admin/notifications',
					'/admin/content',
					'/admin/content'
				]}
				classNames={{
					tabList: 'bg-transparent'
				}}
				selectedKey={pathname}
				isVertical={true}
				color='primary'
				fullWidth={true}
				size={'lg'}
			>
				<Tab
					className='justify-start'
					key='/admin/products'
					title='Продукция'
					href='/admin/products'
				/>
				<Tab
					className='justify-start'
					key='/admin/orders'
					title='Заказы'
					href='/admin/orders'
				/>
				<Tab
					className='justify-start'
					key='/admin/notifications'
					title='Отправка уведомлений'
					href='/admin/notifications'
				/>
				<Tab
					className='justify-start'
					key='/admin/content'
					title='Настройка контента'
					href='/admin/content'
				/>
				<Tab
					className='justify-start'
					key='/admin/sales'
					title='Анализ продаж'
					href='/admin/sales'
				/>
			</Tabs>
			{/* <Divider />
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
			</Button> */}
			<div className='pl-2 flex flex-row justify-between'>
				{data ? (
					<User
						name={`${data?.lastName} ${data?.firstName}`}
						description='Администратор'
						avatarProps={{
							isDisabled: true
						}}
					/>
				) : (
					<div className='max-w-[300px] w-full flex items-center gap-3'>
						<div>
							<Skeleton className='flex rounded-full w-12 h-12' />
						</div>
						<div className='w-full flex flex-col gap-2'>
							<Skeleton className='h-3 w-3/5 rounded-lg' />
							<Skeleton className='h-3 w-4/5 rounded-lg' />
						</div>
					</div>
				)}
				<Button
					isIconOnly
					color='danger'
					variant='flat'
				>
					<LogOut />
				</Button>
			</div>
		</div>
	)
}
