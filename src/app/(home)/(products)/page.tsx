'use client'

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { ProductRow } from './product-row'

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
			<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>

			<div className="space-y-2.5">
				{/* <OrderTableFilters /> */}
				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[64px]" />
								<TableHead className="w-[60px]">ID</TableHead>
								<TableHead className="w-[80px]">Imagem</TableHead>
								<TableHead className="w-[300px]">Titulo</TableHead>
								<TableHead className="w-[180px]">Categoria</TableHead>
								<TableHead className="w-[100px]">Preço</TableHead>
								<TableHead className="w-[140px]">Avaliação</TableHead>
								<TableHead className="w-[80px]" />
								<TableHead className="w-[80px]" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map((product) => (
								<ProductRow key={product.id} product={product} />
							))}
						</TableBody>
					</Table>
				</div>
				{/* {result && (
					<Pagination
						pageIndex={result.meta.pageIndex}
						totalCount={result.meta.totalCount}
						perPage={result.meta.perPage}
						onPageChange={handlePaginate}
					/>
				)} */}
			</div>
		</div>
	)
}
