import { api } from '@/lib/axios'

export async function fetchCategories() {
	const response = await api.get<string[]>('/products/categories')
	return ['All', ...response.data]
}
