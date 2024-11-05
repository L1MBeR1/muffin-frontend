import { Spinner } from '@nextui-org/react'
import { useEffect } from 'react'

import { IProductsOrders } from '@/types/product.types'

import useProductOrders from '@/hooks/admin/useProductsOrders'

interface IOrder {
	orderNumber: number
	orderDate: string
	paymentDate: string
	quantity: number
	totalPrice: string
}

interface IProduct {
	id: number
	name: string
	orders: IOrder[]
}

export default function Orders({
	startDate,
	endDate,
	productId
}: IProductsOrders) {
	const { data, isLoading, isFetching, error, refetch } = useProductOrders({
		startDate,
		endDate,
		productId
	})

	useEffect(() => {
		refetch()
	}, [startDate, endDate, productId])

	if (isFetching) {
		return (
			<div className='w-full h-full flex items-center justify-center'>
				<Spinner
					color='secondary'
					size='lg'
				/>
			</div>
		)
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	if (
		!data ||
		data.length === 0 ||
		data.every(
			(product: { orders: string | any[] }) => product.orders.length === 0
		)
	) {
		return (
			<div className='w-full h-full flex items-center justify-center'>
				<p className='text-xl'>Нет продаж по данному запросу</p>
			</div>
		)
	}

	let totalAllQuantity = 0
	let totalAllPrice = 0

	return (
		<div className='overflow-y-auto w-fit'>
			<table className=' bg-white border-2 border-gray-300'>
				<thead className='sticky top-0 bg-primary-200 z-10'>
					<tr>
						<th className='px-4 py-2 border border-gray-300 text-md font-bold text-gray-700 text-center'>
							Продукт
						</th>
						<th className='px-4 py-2 border border-gray-300 text-md font-bold text-gray-700 text-center'>
							Номер заказа
						</th>
						<th className='px-4 py-2 border border-gray-300 text-md font-bold text-gray-700 text-center'>
							Дата заказа
						</th>
						<th className='px-4 py-2 border border-gray-300 text-md font-bold text-gray-700 text-center'>
							Дата оплаты
						</th>
						<th className='px-4 py-2 border border-gray-300 text-md font-bold text-gray-700 text-center'>
							Кол-во (шт.)
						</th>
						<th className='px-4 py-2 border border-gray-300 text-md font-bold text-gray-700 text-center'>
							Сто-ть (руб.)
						</th>
					</tr>
				</thead>
				<tbody>
					{data.map((product: IProduct) => {
						const { id, name, orders } = product

						const totalProductPrice = orders.reduce(
							(acc, order) => acc + parseFloat(order.totalPrice),
							0
						)
						const totalProductQuantity = orders.reduce(
							(acc, order) => acc + order.quantity,
							0
						)

						totalAllQuantity += totalProductQuantity
						totalAllPrice += totalProductPrice

						return (
							<>
								{orders.map((order, index) => (
									<tr
										key={`${id}-${index}`}
										className='even:bg-primary-50 odd:bg-secondary-50'
									>
										<td className='px-4 py-2 border border-gray-300'>
											{index === 0 ? name : ''}
										</td>
										<td className='px-4 py-2 border border-gray-300 text-right'>
											{order.orderNumber}
										</td>
										<td className='px-4 py-2 border border-gray-300 text-right'>
											{new Date(order.orderDate).toLocaleDateString()}
										</td>
										<td className='px-4 py-2 border border-gray-300 text-right'>
											{new Date(order.paymentDate).toLocaleDateString()}
										</td>
										<td className='px-4 py-2 border border-gray-300 text-right'>
											{order.quantity}
										</td>
										<td className='px-4 py-2 border border-gray-300 text-right'>
											{parseFloat(order.totalPrice).toFixed(2)}
										</td>
									</tr>
								))}

								{orders.length > 0 && (
									<tr className='font-bold bg-primary-100 text-lg'>
										<td
											className='px-4 py-2 border border-gray-300'
											colSpan={4}
										>
											Итого за {name}
										</td>
										<td className='px-4 py-2 border border-gray-300 text-right'>
											{totalProductQuantity}
										</td>
										<td className='px-4 py-2 border border-gray-300 text-right'>
											{totalProductPrice.toFixed(2)}
										</td>
									</tr>
								)}
							</>
						)
					})}
				</tbody>
				<tfoot className='sticky bottom-0'>
					<tr className='font-bold bg-primary-200 text-lg'>
						<td
							className='px-4 py-2 border border-gray-300'
							colSpan={4}
						>
							Всего
						</td>
						<td className='px-4 py-2 border border-gray-300 text-right'>
							{totalAllQuantity}
						</td>
						<td className='px-4 py-2 border border-gray-300 text-right'>
							{totalAllPrice.toFixed(2)}
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	)
}
