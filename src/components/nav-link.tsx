'use client'

import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

export type NavLinkProps = LinkProps & {
	children: React.ReactNode
}
export function NavLink(props: NavLinkProps) {
	const pathname = usePathname()
	return (
		<Link
			data-current={pathname === props.href}
			className="flex items-center gap-1.5 text-base font-medium text-muted-foreground hover:text-foreground border-b-2  border-transparent data-[current=true]:text-foreground data-[current=true]:border-purple-500"
			{...props}
		/>
	)
}
