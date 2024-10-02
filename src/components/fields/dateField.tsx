'use client'

import { DateValue, parseDate } from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import { useDateFormatter } from '@react-aria/i18n'
import { parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

type Variant = 'flat' | 'faded' | 'bordered' | 'underlined'
type Size = 'sm' | 'md' | 'lg'
interface DateFieldProps {
	isoDate: string | null
	size: Size
	variant: Variant
	onChange: (date: DateValue | null) => void
}

export default function DateField({
	isoDate,
	size,
	variant,
	onChange
}: DateFieldProps) {
	const [value, setValue] = useState<DateValue | null>(null)
	const formatter = useDateFormatter({ dateStyle: 'full' })

	useEffect(() => {
		if (isoDate) {
			const parsedDate = parseISO(isoDate)
			setValue(parseDate(parsedDate.toISOString().split('T')[0]))
		}
	}, [isoDate])

	const handleDateChange = (newDate: DateValue | null) => {
		setValue(newDate)
		onChange(newDate)
	}

	return (
		<div className='flex flex-col gap-y-2'>
			<DatePicker
				label='День рождения'
				value={value}
				size={size}
				variant={variant}
				onChange={handleDateChange}
			/>
		</div>
	)
}
