import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Product } from '../page'

import '@testing-library/jest-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EditProduct } from './edit-product'

const product: Product = {
	id: 1,
	title: 'Test Product',
	description: 'Test Description',
	category: 'Test Category',
	price: 9.99,
	image: 'https://github.com/tlsamaral.png',
	rating: {
		rate: 4.5,
		count: 10,
	},
}
jest.mock('@/app/http/get-product', () => ({
	getProduct: jest.fn(() => Promise.resolve(product)),
}))

describe('Edit Product', () => {
	it('should render correctly dialog', async () => {
		const wrapper = render(<EditProduct open productId={product.id} />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={new QueryClient()}>
					<Dialog>
						<DialogTrigger asChild>
							<Button>Edit Product</Button>
						</DialogTrigger>
						{children}
					</Dialog>
				</QueryClientProvider>
			),
		})

		const openButton = wrapper.getByText('Edit Product')
		const user = userEvent.setup()

		await user.click(openButton)

		expect(await wrapper.findByLabelText('Title')).toHaveValue('Test Product')
		expect(wrapper.getByLabelText('Description')).toHaveValue(
			'Test Description',
		)
	})

	it('should be disabled category field', async () => {
		const wrapper = render(<EditProduct open productId={product.id} />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={new QueryClient()}>
					<Dialog>
						<DialogTrigger asChild>
							<Button>Edit Product</Button>
						</DialogTrigger>
						{children}
					</Dialog>
				</QueryClientProvider>
			),
		})

		const openButton = wrapper.getByText('Edit Product')
		const user = userEvent.setup()

		await user.click(openButton)

		expect(wrapper.getByRole('combobox', { name: 'Category' })).toBeDisabled()
	})
})
