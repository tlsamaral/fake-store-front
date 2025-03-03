import { api } from '@/lib/axios'
import type { Product } from './get-product'

interface ProductRegister {
	title: string
	price: number
	description: string
	category: string
	image: string | null
}
export async function createProduct({
	title,
	price,
	description,
	category,
	image,
}: ProductRegister) {
	const response = await api.post<Product>('/products', {
		title,
		price,
		description,
		category,
		image,
	})
	return response.data
}
