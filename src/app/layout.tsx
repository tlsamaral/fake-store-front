import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Fake Store Frontend',
	description: 'A application for connect to Fake Store API',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	)
}
