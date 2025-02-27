import { api } from '@/lib/axios'
import type { Product } from '../(home)/(products)/page'

export async function getProduct(id: number) {
	const response = await api.get<Product>(`/products/${id}`)
	return response.data
}
