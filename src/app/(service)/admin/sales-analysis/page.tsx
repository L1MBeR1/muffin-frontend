'use client'

import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow
} from '@nextui-org/react'
import React, { useState } from 'react'

import useProductOrders from '@/hooks/useProductsOrders'

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
	{ key: 'name', label: 'Product Name' },
	{ key: 'orderNumber', label: 'Order Number' },
	{ key: 'orderDate', label: 'Order Date' },
	{ key: 'paymentDate', label: 'Payment Date' },
	{ key: 'quantity', label: 'Quantity' },
	{ key: 'totalPrice', label: 'Total Price' }
]

export default function Orders() {
	const [startDate, setStartDate] = useState<string | undefined>(undefined)
	const [endDate, setEndDate] = useState<string | undefined>(undefined)
	const [productId, setProductId] = useState<string | undefined>(undefined)

	const { data, isLoading, isFetching, error } = useProductOrders({})

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

							const productKey = id.toString()
							let productTotal = 0

							return (
								<React.Fragment key={productKey}>
									{orders.map((order, index) => {
										const price = parseFloat(order.totalPrice)
										productTotal += price
										return (
											<TableRow key={`${productKey}-${index}`}>
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
										)
									})}

									<TableRow>
										<TableCell
											colSpan={5}
											style={{ textAlign: 'right', fontWeight: 'bold' }}
										>
											Total for {name}:
										</TableCell>
										<TableCell>{productTotal.toFixed(2)}</TableCell>
									</TableRow>
								</React.Fragment>
							)
						})}
				</TableBody>
			</Table>
		</div>
	)
}
