import { Toaster } from 'sonner'

import { ServiceHeader } from '@/components/partials/serviceHeader'

import Sidebar from './sidebar'
import { servicePadding } from '@/theme/paddings'

export default function Base({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='main text-foreground bg-background max-h-screen overflow-hidden'>
			<ServiceHeader />
			<Toaster />
			<main
				className={`${servicePadding} flex flex-row space-x-8 mt-24 max-w-full w-full h-screen max-h-screen overflow-hidden pb-36`}
			>
				<Sidebar />
				{children}
			</main>
		</div>
	)
}
