import { api } from '@/lib/axios'

interface ProductDelete {
	productId: number
}
export async function deleteProduct({ productId }: ProductDelete) {
	const response = await api.delete(`/products/${productId}`)
	return response.data
}
