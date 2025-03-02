import { fetchProducts } from '@/app/http/fetch-products'
import { useQuery } from '@tanstack/react-query'
import { ProductTable } from './components/products-table'

export interface Product {
	id: number
	title: string
	price: number
	category: string
	description: string
	image: string
	rating: {
		rate: number
		count: number
	}
}

// Como é um teste, eu quis ter uma UI&UX um pouco mais interessante, então optei por fazer a busca de produtos com o React query e não usar o SSR do Next.js.
export default function Home() {
	// const products = await fetchProducts()
	// const sortedProducts = products.sort((a: Product, b: Product) => {
	// 	if (b.rating.rate >= 4.5 && a.rating.rate < 4.5) return 1
	// 	if (a.rating.rate >= 4.5 && b.rating.rate < 4.5) return -1

	// 	return b.rating.rate - a.rating.rate
	// })

	return (
		<div className="flex flex-col gap-4 max-w-7xl mx-auto">
			<h1 className="text-3xl font-bold tracking-tight">Products</h1>

			<div className="space-y-2.5">
				<ProductTable />
			</div>
		</div>
	)
}
