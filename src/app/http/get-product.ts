import { api } from '@/lib/axios'

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

export async function getProduct(id: number) {
	const response = await api.get<Product>(`/products/${id}`)
	return response.data
}
