import { api } from '@/lib/axios'
import type { Product } from '../(home)/(products)/page'

export async function fetchCategories() {
	const response = await api.get<string[]>('/products/categories')
	return response.data
}
