import { Toaster } from 'sonner'

import { Footer } from '@/components/partials/footer'
import { Header } from '@/components/partials/header'

export default function Base({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='light'>
			<Header />
			<Toaster />
			<main className='flex flex-row'>
				<aside>cайдбар</aside>
				{children}
			</main>
			<Footer />
		</div>
	)
}
