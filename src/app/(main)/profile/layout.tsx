import ProfileList from './profileList'
import { padding } from '@/theme/paddings'

export default function ProfileLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className={`${padding} mt-20 flex flex-row space-x-16`}>
			<ProfileList />
			{children}
		</div>
	)
}
