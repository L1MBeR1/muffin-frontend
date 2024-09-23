'use client'

import {
	Button,
	Link,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle
} from '@nextui-org/react'
import { ShoppingBasket } from 'lucide-react'
import { useState } from 'react'

import { ProfileButton } from './profileButton'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			maxWidth='full'
		>
			<NavbarContent>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
				<NavbarBrand>
					<p className='font-bold text-inherit'>ACME</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className='hidden sm:flex gap-4'
				justify='center'
			>
				<NavbarItem>
					<Link
						color='foreground'
						href='#'
					>
						Features
					</Link>
				</NavbarItem>
				<NavbarItem isActive>
					<Link
						href='#'
						aria-current='page'
					>
						Customers
					</Link>
				</NavbarItem>
				<NavbarItem>
					<Link
						color='foreground'
						href='#'
					>
						Integrations
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem>
					<ProfileButton />
				</NavbarItem>
				<NavbarItem className='hidden lg:flex'>
					<Button
						isIconOnly
						color='primary'
						variant='light'
					>
						<ShoppingBasket />
					</Button>
				</NavbarItem>
			</NavbarContent>

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
