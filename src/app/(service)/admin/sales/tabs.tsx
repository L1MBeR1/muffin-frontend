'use client'

import { Tab, Tabs } from '@nextui-org/react'

interface SalesTabsProps {
	selectedTab: string
	setSelectedTab: (value: string) => void
	isReportReady: boolean
}

export default function SalesTabs({
	selectedTab,
	setSelectedTab,
	isReportReady
}: SalesTabsProps) {
	return (
		<div className='w-fit space-y-4 rounded-2xl h-fit'>
			<Tabs
				disabledKeys={
					!isReportReady ? ['orders', 'buyers', 'bakeries', 'chart'] : []
				}
				variant='bordered'
				selectedKey={selectedTab}
				color='secondary'
				fullWidth={true}
				size={'lg'}
				onSelectionChange={key => setSelectedTab(String(key))}
			>
				<Tab
					className='justify-start'
					key='orders'
					title='Заказы'
				/>
				<Tab
					className='justify-start'
					key='chart'
					title='График'
				/>
				<Tab
					className='justify-start'
					key='bakeries'
					title='Карта'
				/>
				<Tab
					className='justify-start'
					key='buyers'
					title='Анализ покупателей'
				/>
			</Tabs>
		</div>
	)
}
