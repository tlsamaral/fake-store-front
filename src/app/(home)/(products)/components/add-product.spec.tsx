import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { Product } from '../page'

import '@testing-library/jest-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AddProduct } from './add-product'
import { EditProduct } from './edit-product'

jest.mock('@/app/http/fetch-categories', () => ({
	fetchCategories: jest.fn(() =>
		Promise.resolve(['Electronics', 'Clothing', 'Books']),
	),
}))

describe('Add Product', () => {
	it('should render correctly dialog', async () => {
		const wrapper = render(<AddProduct />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={new QueryClient()}>
					<Dialog>
						<DialogTrigger asChild>
							<Button>Add Product</Button>
						</DialogTrigger>
						{children}
					</Dialog>
				</QueryClientProvider>
			),
		})

		const openButton = wrapper.getByText('Add Product')
		const user = userEvent.setup()

		await user.click(openButton)

		expect(
			wrapper.getByRole('combobox', { name: 'Category' }),
		).not.toBeDisabled()

		expect(
			wrapper.getByRole('button', { name: 'Create product' }),
		).toBeInTheDocument()
	})
})
