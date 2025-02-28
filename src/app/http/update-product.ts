import { api } from '@/lib/axios'

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
	const response = await api.put(`/products/${id}`, {
		title,
		price,
		description,
	})
	return response.data
}
