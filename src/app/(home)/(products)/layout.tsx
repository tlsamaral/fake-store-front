'use client'

import { Header } from '@/components/header'

export default function HomeLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main className="px-4 md:px-6 mx-auto mt-4">{children}</main>
			<footer className="mt-auto">
				<p className="text-center text-sm leading-loose">
					Created by
					<a
						className="underline underline-offset-2"
						href="https://tallesamaral.dev"
					>
						Talles Amaral
					</a>
				</p>
			</footer>
		</>
	)
}
