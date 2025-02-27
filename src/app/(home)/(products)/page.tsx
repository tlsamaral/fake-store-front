'use client'

import { ProductTable } from './components/products-table'

export interface Product {
	id: number
	title: string
	price: string
	category: string
	description: string
	image: string
	rating: {
		rate: number
		count: number
	}
}

const products: Product[] = [
	{
		id: 1,
		title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
		price: '$109.95',
		category: 'men clothing',
		description:
			'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) and your everyday',
		image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
		rating: {
			rate: 3.9,
			count: 120,
		},
	},
	{
		id: 2,
		title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
		price: '$109.95',
		category: 'men clothing',
		description:
			'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) and your everyday',
		image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
		rating: {
			rate: 3.9,
			count: 120,
		},
	},
	{
		id: 3,
		title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
		price: '$109.95',
		category: 'men clothing',
		description:
			'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) and your everyday',
		image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
		rating: {
			rate: 3.9,
			count: 120,
		},
	},
]

export default function Home() {
	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl font-bold tracking-tight">Products</h1>

			<div className="space-y-2.5">
				<ProductTable products={products} />
			</div>
		</div>
	)
}
