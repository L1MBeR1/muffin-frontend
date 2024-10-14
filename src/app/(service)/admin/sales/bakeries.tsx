'use client'

import { Spinner } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import BakeriesTable from '@/components/tables/bakeriesAnalysisTable'

import { IProductsOrders } from '@/types/product.types'

import useBakeriesAnalysis from '@/hooks/admin/useBakeriesAnalysis'
import useCustomerCoordinates from '@/hooks/admin/useCustomerCoordinates'

const OrdersHeatMap = dynamic(() => import('@/components/maps/ordersHeatMap'), {
	ssr: false
})

export default function Bakeries({
	startDate,
	endDate,
	productId
}: IProductsOrders) {
	const {
		data: bakeries,
		isFetching: isFetchingBakeries,
		error,
		refetch: refetchBakeries
	} = useBakeriesAnalysis({
		startDate,
		endDate,
		productId
	})

	const {
		data: customerCoordinates,
		refetch: refetchCoordinates,
		isFetching: isFetchingCoordinates
	} = useCustomerCoordinates({
		startDate,
		endDate,
		productId
	})

	useEffect(() => {
		refetchBakeries()
		refetchCoordinates()
	}, [startDate, endDate, productId])

	if (isFetchingBakeries || isFetchingCoordinates) {
		return (
			<div className='w-full h-full flex items-center justify-center'>
				<Spinner
					color='secondary'
					size='lg'
				/>
			</div>
		)
	}
	if (
		!bakeries ||
		bakeries.length === 0 ||
		bakeries.every(
			(bakery: { orderCount: string | number }) => bakery.orderCount === 0
		)
	) {
		return (
			<div className='w-full h-full flex items-center justify-center'>
				<p className='text-xl'>Нет продаж по данному запросу</p>
			</div>
		)
	}
	if (error) return <div>Ошибка загрузки данных</div>

	return (
		<div className='flex flex-row grow w-full justify-around space-x-4'>
			<div className='flex grow h-full max-w-screen-sm'>
				{bakeries && <BakeriesTable bakeries={bakeries} />}
			</div>
			<div className='flex grow h-full'>
				{bakeries && customerCoordinates && (
					<OrdersHeatMap
						bakeries={bakeries}
						orderAddresses={customerCoordinates}
					/>
				)}
			</div>
		</div>
	)
}
