'use client'

import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem
} from '@nextui-org/react'
import { ShoppingBasket } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { APP_PAGES } from '@/config/pages-url.config'

import { ProfileButton } from './profileButton'
import Logo from '@/images/svgs/logo.svg'
import { servicePadding } from '@/theme/paddings'

export function ServiceHeader() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { push } = useRouter()

	return (
		<Navbar
			isBordered
			className={`${servicePadding} fixed top-0 left-0 w-full z-50`}
			maxWidth='full'
			onMenuOpenChange={setIsMenuOpen}
			isBlurred={false}
			position='static'
			classNames={{
				wrapper: '!p-0',
				content: '!p-0'
			}}
		>
			<div className='grid grid-cols-2 items-center w-full'>
				<NavbarContent>
					<NavbarBrand
						className='cursor-pointer'
						onClick={() => {
							push(APP_PAGES.HOME)
						}}
					>
						<Logo />
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent justify='end'>
					<NavbarItem>
						<ProfileButton />
					</NavbarItem>
					<NavbarItem>
						<Button
							isIconOnly
							color='secondary'
							variant='light'
						>
							<ShoppingBasket />
						</Button>
					</NavbarItem>
				</NavbarContent>
			</div>

			<NavbarMenu className='sm:hidden'>
				<NavbarMenuItem>
					<Link
						className='w-full'
						href='#'
						size='lg'
					>
						Пример
					</Link>
				</NavbarMenuItem>
			</NavbarMenu>
		</Navbar>
	)
}
