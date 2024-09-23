import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export default function Base({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<Header />
			<main>{children}</main>
			<Footer />
		</div>
	)
}
