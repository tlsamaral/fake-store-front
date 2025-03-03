import { Separator } from '@/components/ui/separator'
import { Store } from 'lucide-react'
import { NavLink } from './nav-link'
import { ToggleTheme } from './toggle-theme'

export function Header() {
	return (
		<header className="py-4 px-4 md:px-6 border-b">
			<div className="max-w-7xl flex items-center mx-auto gap-4">
				<Store className="h-6 w-6" />
				<Separator orientation="vertical" className="h-6" />
				<nav className="flex items-center space-x-4 lg:space-x-6">
					<NavLink href="/">Products</NavLink>
				</nav>

				<div className="ml-auto">
					<ToggleTheme />
				</div>
			</div>
		</header>
	)
}
