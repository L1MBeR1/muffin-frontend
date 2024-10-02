import { Button } from '@nextui-org/react'
import { ShoppingBasket } from 'lucide-react'

export function BasketButton() {
	return (
		<Button
			isIconOnly
			color='primary'
			variant='light'
		>
			<ShoppingBasket />
		</Button>
	)
}
