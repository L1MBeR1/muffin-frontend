'use client'

interface BakeriesTableProps {
	bakeries: {
		id: string
		address: string
		orderCount: number
	}[]
}

const BakeriesTable: React.FC<BakeriesTableProps> = ({ bakeries }) => {
	const sortedBakeries = [...bakeries].sort(
		(a, b) => b.orderCount - a.orderCount
	)

	return (
		<div className='overflow-auto grow'>
			<table className='table-auto min-w-full rounded-xl border-2'>
				<thead className='bg-primary-200'>
					<tr>
						<th className='px-4 py-2 text-center border border-gray-300'>№</th>
						<th className='px-4 py-2 text-center border border-gray-300'>
							Адрес пекарни
						</th>
						<th className='px-4 py-2 text-center border border-gray-300'>
							Количество заказов
						</th>
					</tr>
				</thead>
				<tbody>
					{sortedBakeries.map((bakery, index) => (
						<tr
							key={bakery.id}
							className='even:bg-primary-50 odd:bg-secondary-50 text-right'
						>
							<td className='px-4 py-2 border border-gray-300'>{index + 1}</td>
							<td className='px-4 py-2 border border-gray-300'>
								{bakery.address}
							</td>
							<td className='px-4 py-2 border border-gray-300 text-right'>
								{bakery.orderCount}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default BakeriesTable
