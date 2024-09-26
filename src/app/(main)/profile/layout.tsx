import ProfileList from './profileList'

export default function ProfileLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className='flex flex-row'>
			<div>
				<ProfileList />
			</div>
			<div>{children}</div>
		</div>
	)
}
