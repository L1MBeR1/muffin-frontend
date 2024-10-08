'use client'

import { Tab, Tabs } from '@nextui-org/react'

interface SalesTabsProps {
	selectedTab: string
	setSelectedTab: (value: string) => void
}

export default function SalesTabs({
	selectedTab,
	setSelectedTab
}: SalesTabsProps) {
	return (
		<div className='w-fit space-y-4 rounded-2xl h-fit'>
			<Tabs
				disabledKeys={[]}
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
					key='map'
					title='Карта'
				/>
				<Tab
					className='justify-start'
					key='customer-analysis'
					title='Анализ покупателей'
				/>
			</Tabs>
		</div>
	)
}
