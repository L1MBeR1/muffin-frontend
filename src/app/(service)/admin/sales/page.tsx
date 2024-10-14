'use client'

import { DateValue, getLocalTimeZone } from '@internationalized/date'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'

import DateField from '@/components/fields/dateField'

import { SelectProduct } from '@/types/product.types'

import useProductsForSelect from '@/hooks/useProductsForSelect'

import Bakeries from './bakeries'
import Buyers from './buyers'
import Chart from './chart'
import Orders from './orders'
import SalesTabs from './tabs'

export default function Sales() {
	const { data: products, isLoading, isError } = useProductsForSelect()
	const [selectedTab, setSelectedTab] = useState('orders')
	const [fromDate, setFromDate] = useState<DateValue | null>(null)
	const [toDate, setToDate] = useState<DateValue | null>(null)
	const [product, setProduct] = useState<number | null>(null)

	const [selectedFromDate, setSelectedFromDate] = useState<DateValue | null>(
		null
	)
	const [selectedToDate, setSelectedToDate] = useState<DateValue | null>(null)
	const [selectedProduct, setSelectedProduct] = useState<number | null>(null)

	const [isReportReady, setIsReportReady] = useState(false)

	const [fromDateError, setFromDateError] = useState<string | null>(null)
	const [toDateError, setToDateError] = useState<string | null>(null)

	const handleFromDateChange = (date: DateValue | null | string) => {
		setFromDate(date as DateValue)
		if (date) {
			setFromDateError(null)
		}
	}

	const handleToDateChange = (date: DateValue | null | string) => {
		setToDate(date as DateValue)
		if (date) {
			setToDateError(null)
		}
	}

	const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value
		setProduct(selectedValue ? Number(selectedValue) : null)
	}

	const handleSave = () => {
		if (!fromDate && !toDate) {
			setFromDateError('Заполните поле')
			setToDateError('Заполните поле')
			return
		}
		if (!fromDate) {
			setFromDateError('Заполните поле')
			return
		}
		if (!toDate) {
			setToDateError('Заполните поле')
			return
		}

		if (
			fromDate.toDate(getLocalTimeZone()) > toDate.toDate(getLocalTimeZone())
		) {
			setFromDateError('Дата "от" больше даты "до"')
			return
		}

		if (
			fromDate.toDate(getLocalTimeZone()) == toDate.toDate(getLocalTimeZone())
		) {
			setFromDateError('Дата "от" равна дате "до"')
			return
		}

		setSelectedFromDate(fromDate)
		setSelectedToDate(toDate)
		setSelectedProduct(product)

		setIsReportReady(true)
	}

	const renderTabContent = () => {
		if (!isReportReady) {
			return (
				<div className='flex w-full h-full items-center justify-center text-xl'>
					<p>Заполните даты и выберите продукт для просмотра отчетов.</p>
				</div>
			)
		}

		switch (selectedTab) {
			case 'orders':
				return (
					<Orders
						startDate={
							selectedFromDate
								? selectedFromDate.toDate(getLocalTimeZone()).toISOString()
								: null
						}
						endDate={
							selectedToDate
								? selectedToDate.toDate(getLocalTimeZone()).toISOString()
								: null
						}
						productId={selectedProduct}
					/>
				)
			case 'buyers':
				return (
					<Buyers
						startDate={
							selectedFromDate
								? selectedFromDate.toDate(getLocalTimeZone()).toISOString()
								: null
						}
						endDate={
							selectedToDate
								? selectedToDate.toDate(getLocalTimeZone()).toISOString()
								: null
						}
						productId={selectedProduct}
					/>
				)
			case 'bakeries':
				return (
					<Bakeries
						startDate={
							selectedFromDate
								? selectedFromDate.toDate(getLocalTimeZone()).toISOString()
								: null
						}
						endDate={
							selectedToDate
								? selectedToDate.toDate(getLocalTimeZone()).toISOString()
								: null
						}
						productId={selectedProduct}
					/>
				)
			case 'chart':
				return (
					<Chart
						startDate={
							selectedFromDate
								? selectedFromDate.toDate(getLocalTimeZone()).toISOString()
								: null
						}
						endDate={
							selectedToDate
								? selectedToDate.toDate(getLocalTimeZone()).toISOString()
								: null
						}
						productId={selectedProduct}
					/>
				)
			default:
				return <></>
		}
	}

	return (
		<div className='flex flex-col space-y-4 grow'>
			<h2 className='text-3xl'>Анализ продаж</h2>
			<div className='flex flex-row gap-4 w-full'>
				<DateField
					size='lg'
					variant='bordered'
					color='secondary'
					isoDate={
						fromDate ? fromDate.toDate(getLocalTimeZone()).toISOString() : null
					}
					onChange={handleFromDateChange}
					label='Дата от'
					useISO={false}
					isInvalid={!!fromDateError}
					errorMessage={fromDateError}
				/>

				<DateField
					size='lg'
					variant='bordered'
					color='secondary'
					isoDate={
						toDate ? toDate.toDate(getLocalTimeZone()).toISOString() : null
					}
					onChange={handleToDateChange}
					label='Дата до'
					useISO={false}
					isInvalid={!!toDateError}
					errorMessage={toDateError}
				/>

				<div className='w-80'>
					<Select
						size='lg'
						variant='bordered'
						label='Выберите продукт'
						placeholder='Все'
						className='grow'
						onChange={handleProductChange}
					>
						{products?.map((product: SelectProduct) => (
							<SelectItem
								key={product.id}
								value={product.id.toString()}
							>
								{product.name}
							</SelectItem>
						))}
					</Select>
				</div>
				<Button
					onClick={() => {
						handleSave()
					}}
					className='h-full'
					color='primary'
					size='lg'
				>
					Составить анализ
				</Button>
			</div>

			<SalesTabs
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				isReportReady={isReportReady}
			/>

			{renderTabContent()}
		</div>
	)
}
