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
				'group inline-flex items-center hover:bg-content2 grow justify-center',
				'cursor-pointer border-3 border-default rounded-xl whgap-4 p-4',
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
			orientation='horizontal'
			onChange={handleChange}
			value={selectedGender || undefined}
		>
			<CustomRadio
				value={EnumGender.male}
				selected={selectedGender === EnumGender.male}
			>
				Мужской
			</CustomRadio>
			<CustomRadio
				value={EnumGender.female}
				selected={selectedGender === EnumGender.female}
			>
				Женский
			</CustomRadio>
		</RadioGroup>
	)
}
