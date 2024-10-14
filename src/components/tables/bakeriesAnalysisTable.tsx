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
			<table className='table-auto min-w-full border-spacing-3'>
				<thead className=''>
					<tr>
						<th className='  p-3 text-left'>№</th>
						<th className='  p-3 text-left'>Адрес пекарни</th>
						<th className=' p-3 text-left'>Количество заказов</th>
					</tr>
				</thead>
				<tbody>
					{sortedBakeries.map((bakery, index) => (
						<tr key={bakery.id}>
							<td className='  p-3'>{index + 1}</td>
							<td className='  p-3'>{bakery.address}</td>
							<td className='  p-3'>{bakery.orderCount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default BakeriesTable
