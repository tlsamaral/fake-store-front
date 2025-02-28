import { api } from '@/lib/axios'

interface ProductRegister {
	title: string
	price: number
	description: string
	category: string
}
export async function createProduct({
	title,
	price,
	description,
	category,
}: ProductRegister) {
	const response = await api.post('/products', {
		title,
		price,
		description,
		category,
	})
	return response.data
}
