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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { APP_PAGES } from '@/config/pages-url.config'

import { ProfileButton } from './profileButton'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { push } = useRouter()

	return (
		<Navbar
			onMenuOpenChange={setIsMenuOpen}
			maxWidth='full'
			isBlurred={false}
		>
			<div className='grid grid-cols-3 items-center w-full'>
				<NavbarContent className='md:hidden'>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					/>
				</NavbarContent>
				<NavbarContent className='hidden md:flex gap-6 justify-start'>
					<NavbarItem>
						<Link>Продукция</Link>
					</NavbarItem>
					<NavbarItem>
						<Link>О нас</Link>
					</NavbarItem>
					<NavbarItem>
						<Link>Адреса и контакты</Link>
					</NavbarItem>
				</NavbarContent>

				{/* Центр — бренд компании */}
				<NavbarContent className='justify-self-center'>
					<NavbarBrand
						onClick={() => {
							push(APP_PAGES.HOME)
						}}
					>
						<p className='font-bold text-inherit text-center'>ACME</p>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent justify='end'>
					<NavbarItem>
						<ProfileButton />
					</NavbarItem>
					<NavbarItem>
						<Button
							isIconOnly
							color='primary'
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
