'use client'

import { Spinner } from '@nextui-org/react'
import { useEffect } from 'react'

import SalesChart from '@/components/charts/salesChart'

import { IProductsOrders } from '@/types/product.types'

import useSalesChartAnalysis from '@/hooks/admin/useSalesChartAnalysis'

export default function Chart({
	startDate,
	endDate,
	productId
}: IProductsOrders) {
	const { data, isLoading, error, refetch, isFetching } = useSalesChartAnalysis(
		{
			startDate,
			endDate,
			productId
		}
	)

	useEffect(() => {
		refetch()
	}, [startDate, endDate, productId])

	if (isLoading || isFetching) {
		return (
			<div className='w-full h-full flex items-center justify-center'>
				<Spinner
					color='secondary'
					size='lg'
				/>
			</div>
		)
	}
	if (error) return <div>Ошибка загрузки данных</div>

	if (
		!data ||
		data.length === 0 ||
		data.every((day: { count: string | number }) => day.count === 0)
	) {
		return (
			<div className='w-full h-full flex items-center justify-center'>
				<p className='text-xl'>Нет продаж по данному запросу</p>
			</div>
		)
	}

	return (
		<div className='flex flex-row grow w-full justify-around space-x-4'>
			<SalesChart data={data} />
		</div>
	)
}
