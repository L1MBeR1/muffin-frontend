import { Toaster } from 'sonner'

import { Footer } from '@/components/partials/footer'
import { Header } from '@/components/partials/header'

export default function Base({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='main text-foreground bg-background'>
			<Header />
			<Toaster />
			<main>{children}</main>
			<Footer />
		</div>
	)
}
