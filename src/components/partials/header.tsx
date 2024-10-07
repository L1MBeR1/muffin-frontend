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
import Logo from '@/images/svgs/logo.svg'
import { padding } from '@/theme/padding'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { push } = useRouter()

	return (
		<Navbar
			className={`${padding} fixed top-0 left-0 w-full z-50`}
			maxWidth='full'
			onMenuOpenChange={setIsMenuOpen}
			isBlurred={false}
			classNames={{
				wrapper: '!p-0',
				content: '!p-0'
			}}
		>
			<div className='grid grid-cols-3 items-center w-full'>
				<NavbarContent className='md:hidden'>
					<NavbarMenuToggle
						aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					/>
				</NavbarContent>
				<NavbarContent className='hidden md:flex gap-6 justify-start font-semibold'>
					<NavbarItem>
						<Link color='secondary'>Продукция</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color='secondary'>О нас</Link>
					</NavbarItem>
					<NavbarItem>
						<Link color='secondary'>Адреса и контакты</Link>
					</NavbarItem>
				</NavbarContent>

				<NavbarContent className='justify-self-center'>
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
