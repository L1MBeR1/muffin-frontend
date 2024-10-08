'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react'
import { useState } from 'react'

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

const columns = [
	{ key: 'name', label: 'Продукт' },
	{ key: 'orderNumber', label: 'Номер заказа' },
	{ key: 'orderDate', label: 'Дата заказа' },
	{ key: 'paymentDate', label: 'Дата оплаты' },
	{ key: 'quantity', label: 'Количество' },
	{ key: 'totalPrice', label: 'Стоимость' }
]

export default function Orders() {
	const [startDate, setStartDate] = useState<string | undefined>(undefined)
	const [endDate, setEndDate] = useState<string | undefined>(undefined)
	const [productId, setProductId] = useState<string | undefined>(undefined)

	const { data, isLoading, isFetching, error } = useProductOrders({
		startDate,
		endDate,
		productId
	})

	if (isLoading || isFetching) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div className='flex flex-col'>
			<Table aria-label='Product Orders Table'>
				<TableHeader>
					{columns.map(column => (
						<TableColumn key={column.key}>{column.label}</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					{data &&
						data.map((product: IProduct) => {
							const { id, name, orders } = product

							return orders.map((order, index) => (
								<TableRow key={`${id}-${index}`}>
									<TableCell>{index === 0 ? name : ''}</TableCell>
									<TableCell>{order.orderNumber}</TableCell>
									<TableCell>
										{new Date(order.orderDate).toLocaleDateString()}
									</TableCell>
									<TableCell>
										{new Date(order.paymentDate).toLocaleDateString()}
									</TableCell>
									<TableCell>{order.quantity}</TableCell>
									<TableCell>{order.totalPrice}</TableCell>
								</TableRow>
							))
						})}
				</TableBody>
			</Table>
		</div>
	)
}
