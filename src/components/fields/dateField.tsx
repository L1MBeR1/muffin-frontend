'use client'

import { DateValue, getLocalTimeZone, parseDate } from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import { useDateFormatter } from '@react-aria/i18n'
import { parseISO } from 'date-fns'
import { useEffect, useState } from 'react'

type Variant = 'flat' | 'faded' | 'bordered' | 'underlined'
type Size = 'sm' | 'md' | 'lg'
type Color =
	| 'default'
	| 'primary'
	| 'secondary'
	| 'success'
	| 'warning'
	| 'danger'
interface DateFieldProps {
	isoDate: string | null
	size: Size
	variant: Variant
	color?: Color
	label: string
	useISO?: boolean
	isInvalid?: boolean
	errorMessage?: string | null
	onChange: (date: DateValue | null | string) => void
}

export default function DateField({
	isoDate,
	size,
	variant,
	color,
	onChange,
	label,
	isInvalid,
	errorMessage,
	useISO = false
}: DateFieldProps) {
	const [value, setValue] = useState<DateValue | null>(null)
	const formatter = useDateFormatter({ dateStyle: 'full' })

	useEffect(() => {
		if (isoDate && useISO) {
			const parsedDate = parseISO(isoDate)
			setValue(parseDate(parsedDate.toISOString().split('T')[0]))
		}
	}, [isoDate, useISO])

	const handleDateChange = (newDate: DateValue | null) => {
		setValue(newDate)

		if (useISO && newDate) {
			const formattedDate = newDate.toDate(getLocalTimeZone()).toISOString()
			onChange(formattedDate)
		} else {
			onChange(newDate)
		}
	}

	const handleClearDate = () => {
		setValue(null)
		onChange(null)
	}

	return (
		<div className='flex flex-col gap-y-2'>
			<DatePicker
				label={label}
				value={value}
				size={size}
				color={color}
				variant={variant}
				onChange={handleDateChange}
				showMonthAndYearPickers
				isInvalid={isInvalid}
				errorMessage={errorMessage}
			/>
		</div>
	)
}
