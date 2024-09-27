// Убедитесь, что путь к типам правильный
import {
	RadioGroup,
	RadioProps,
	VisuallyHidden,
	cn,
	useRadio
} from '@nextui-org/react'

import { EnumGender } from '@/types/auth.types'

interface CustomRadioProps extends RadioProps {
	selected: boolean
}

const CustomRadio = ({ selected, ...props }: CustomRadioProps) => {
	const {
		Component,
		children,
		getBaseProps,
		getInputProps,
		getLabelProps,
		getLabelWrapperProps
	} = useRadio(props)

	return (
		<Component
			{...getBaseProps()}
			className={cn(
				'group inline-flex items-center justify-between hover:bg-content2',
				'max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4',
				{ 'data-[selected=true]:border-primary': selected }
			)}
		>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>

			<div {...getLabelWrapperProps()}>
				{children && <span {...getLabelProps()}>{children}</span>}
			</div>
		</Component>
	)
}

interface GenderSelectorProps {
	onChange: (value: EnumGender) => void
	selectedGender: EnumGender | null
}

export default function GenderSelector({
	onChange,
	selectedGender
}: GenderSelectorProps) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as EnumGender
		onChange(value)
	}

	return (
		<RadioGroup
			label='Пол'
			orientation={'horizontal'}
			onChange={handleChange}
		>
			<CustomRadio
				value={EnumGender.male}
				selected={selectedGender === EnumGender.male}
			>
				Мужчина
			</CustomRadio>
			<CustomRadio
				value={EnumGender.female}
				selected={selectedGender === EnumGender.female}
			>
				Женщина
			</CustomRadio>
		</RadioGroup>
	)
}
