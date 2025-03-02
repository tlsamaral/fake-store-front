import { api } from '@/lib/axios'
import type { Product } from './get-product'

interface ProductEdit {
	id: number
	title: string
	price: number
	description: string
}
export async function updateProduct({
	id,
	title,
	price,
	description,
}: ProductEdit) {
	const response = await api.put<Product>(`/products/${id}`, {
		title,
		price,
		description,
	})
	return response.data
}
