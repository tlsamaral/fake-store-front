'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { ReactQueryProvider } from '@/providers/react-query-provider'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import './globals.css'
import { useEffect, useState } from 'react'

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted)
		return (
			<html lang="en">
				<body />
			</html>
		)

	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased min-h-screen">
				<ReactQueryProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Toaster richColors position="top-center" />
						{children}
					</ThemeProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
