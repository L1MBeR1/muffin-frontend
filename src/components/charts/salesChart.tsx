'use client'

import {
	Bar,
	BarChart,
	Brush,
	CartesianGrid,
	ReferenceLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts'

const SalesChart = ({ data }: { data: any[] }) => {
	const formatDateWithoutYear = (tick: string) => {
		const [year, month, day] = tick.split('-')
		return `${day}-${month}-${year.slice(2)}`
	}

	return (
		<ResponsiveContainer
			width='100%'
			height='100%'
		>
			<BarChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 50
				}}
			>
				<CartesianGrid strokeDasharray='3 3' />

				<XAxis
					dataKey='date'
					tickFormatter={formatDateWithoutYear}
					angle={-45}
					textAnchor='end'
					height={80}
				/>

				<YAxis />

				<Tooltip formatter={(value: number) => [`${value}`, 'Заказы']} />

				<ReferenceLine
					y={0}
					stroke='#000'
				/>
				<Brush
					dataKey='date'
					height={30}
					stroke='hsl(var(--nextui-secondary))'
				/>

				<Bar
					dataKey='count'
					fill='hsl(var(--nextui-secondary))'
					name='Заказы'
				/>
			</BarChart>
		</ResponsiveContainer>
	)
}

export default SalesChart
