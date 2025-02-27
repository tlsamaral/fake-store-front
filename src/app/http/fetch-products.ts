import { api } from '@/lib/axios'
import type { Product } from '../(home)/(products)/page'

export async function fetchProducts() {
	const response = await api.get<Product[]>('/products')
	return response.data
}
