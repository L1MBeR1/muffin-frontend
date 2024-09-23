export default function MainLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<header>Main Header</header>
			<main>{children}</main>
			<footer>Main Footer</footer>
		</div>
	)
}
