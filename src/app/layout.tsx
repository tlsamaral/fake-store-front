import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'

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
			<body className="antialiased min-h-screen">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />

					<main className="max-w-7xl mx-auto mt-4">{children}</main>

					<footer className="mt-auto fixed bottom-0 w-full">
						<p className="text-center text-sm leading-loose">
							Created by{' '}
							<a
								className="underline underline-offset-2"
								href="https://tallesamaral.dev"
							>
								Talles Amaral
							</a>
						</p>
					</footer>
				</ThemeProvider>
			</body>
		</html>
	)
}
