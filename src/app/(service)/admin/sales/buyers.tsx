'use client'

import { Spinner } from '@nextui-org/react'
import { useEffect } from 'react'
import { Cell, Pie, PieChart, Tooltip } from 'recharts'

import { IProductsOrders } from '@/types/product.types'

import useBuyersAnalysis from '@/hooks/admin/useBuyersAnalysis'

type Gender = 'male' | 'female' | 'unknown'

const GENDER_COLORS: Record<Gender, string> = {
	male: '#9BC5DD',
	female: '#FFC2AE',
	unknown: '#E9D5CE'
}

const AGE_COLORS: Record<string, string> = {
	'<18': '#CDE85F',
	'18-29': '#AECB56',
	'30-39': '#90AE4D',
	'40-49': '#719044',
	'50<': '#52733B',
	unknown: '#E9D5CE'
}

const GENDER_TRANSLATIONS: Record<Gender, string> = {
	male: 'Мужчины',
	female: 'Женщины',
	unknown: 'Неизвестно'
}

const AGE_TRANSLATIONS: Record<string, string> = {
	'<18': 'Младше 18',
	'18-29': '18-29',
	'30-39': '30-39',
	'40-49': '40-49',
	'50<': '50 и старше',
	unknown: 'Неизвестно'
}

interface GenderData {
	name: Gender
	value: number
}

interface AgeData {
	name: keyof typeof AGE_COLORS
	value: number
}

export default function Buyers({
	startDate,
	endDate,
	productId
}: IProductsOrders) {
	const { data, isLoading, isFetching, error, refetch } = useBuyersAnalysis({
		startDate,
		endDate,
		productId
	})

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

	if (error) {
		return <p>Произошла ошибка при загрузке данных</p>
	}

	const ageData: AgeData[] = data?.ageDistribution
		? Object.entries(data.ageDistribution).map(([name, value]) => ({
				name: name as keyof typeof AGE_COLORS,
				value: typeof value === 'number' ? value : 0
			}))
		: []

	const genderData: GenderData[] = data?.genderDistribution
		? Object.entries(data.genderDistribution).map(([name, value]) => ({
				name: name as Gender,
				value: typeof value === 'number' ? value : 0
			}))
		: []

	const totalGender = genderData.reduce((acc, entry) => acc + entry.value, 0)

	const totalAge = ageData.reduce((acc, entry) => acc + entry.value, 0)

	return (
		<div className='flex flex-row h-full w-full justify-around p-5'>
			{data ? (
				<>
					<div className='flex flex-col '>
						<p className='flex justify-center text-xl'>Гендерный анализ</p>
						<div className='flex flex-row'>
							<PieChart
								width={400}
								height={400}
							>
								<Pie
									data={genderData}
									cx='50%'
									cy='50%'
									outerRadius={170}
									fill='#8884d8'
									dataKey='value'
								>
									{genderData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={
												GENDER_COLORS[entry.name] || GENDER_COLORS['unknown']
											}
										/>
									))}
								</Pie>
								<Tooltip
									formatter={(value, name) => [
										`${value}`,
										GENDER_TRANSLATIONS[name as Gender] || 'Неизвестно'
									]}
								/>
							</PieChart>

							<div className='flex flex-col space-y-2 pt-7'>
								{genderData.map(entry => (
									<div
										key={entry.name}
										className='flex items-center space-x-2'
									>
										<div
											className='rounded-md'
											style={{
												backgroundColor: GENDER_COLORS[entry.name],
												width: '20px',
												height: '20px'
											}}
										/>
										<span>{`${GENDER_TRANSLATIONS[entry.name]} (${totalGender ? ((entry.value / totalGender) * 100).toFixed(2) : 0}%)`}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='flex flex-col'>
						<p className='flex justify-center text-xl'>Возрастной анализ</p>
						<div className='flex flex-row'>
							<PieChart
								width={400}
								height={400}
							>
								<Pie
									data={ageData}
									cx='50%'
									cy='50%'
									outerRadius={170}
									fill='#82ca9d'
									dataKey='value'
								>
									{ageData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={AGE_COLORS[entry.name] || AGE_COLORS['unknown']}
										/>
									))}
								</Pie>
								<Tooltip
									formatter={(value, name) => [
										`${value}`,
										AGE_TRANSLATIONS[name as string] || 'Неизвестно'
									]}
								/>
							</PieChart>
							<div className='flex flex-col space-y-2 pt-7'>
								{ageData.map(entry => (
									<div
										key={entry.name}
										className='flex items-center space-x-2'
									>
										<div
											className='rounded-md'
											style={{
												backgroundColor: AGE_COLORS[entry.name],
												width: '20px',
												height: '20px'
											}}
										/>
										<span>{`${AGE_TRANSLATIONS[entry.name]} (${totalAge ? ((entry.value / totalAge) * 100).toFixed(2) : 0}%)`}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				<div className='w-full h-full flex items-center justify-center'>
					<p className='text-xl'>Нет продаж по данному запросу</p>
				</div>
			)}
		</div>
	)
}
