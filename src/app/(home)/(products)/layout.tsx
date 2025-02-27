import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<ReactQueryProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
			>
				<Header />

				<main className="max-w-7xl mx-auto mt-4">{children}</main>

				<footer className="mt-auto">
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
		</ReactQueryProvider>
	)
}
