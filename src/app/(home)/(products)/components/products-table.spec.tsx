import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Product } from '../page'
import { ProductTable } from './products-table'

const products: Product[] = []
// biome-ignore lint/complexity/noForEach: <explanation>
Array.from({ length: 30 }).forEach((_, index) => {
	products.push({
		id: index + 1,
		title: `Product ${index + 1}`,
		description: `Description ${index + 1}`,
		category: `Category ${index + 1}`,
		price: 9.99,
		image: 'https://github.com/tlsamaral.png',
		rating: {
			rate: index === 0 ? 4.5 : 3.5,
			count: 10,
		},
	})
})

jest.mock('@/app/http/fetch-categories', () => ({
	fetchCategories: jest.fn(() =>
		Promise.resolve(['Category 1', 'Category 2', 'Category 3']),
	),
}))

jest.mock('@/app/http/fetch-products', () => ({
	fetchProducts: jest.fn(() => Promise.resolve(products)),
}))

describe('Product Table', () => {
	let queryClient: QueryClient

	beforeEach(() => {
		queryClient = new QueryClient()
	})

	it('should render correctly with products', async () => {
		render(<ProductTable />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			),
		})

		expect(await screen.findByText('Product 1')).toBeInTheDocument()
		expect(screen.getByText('Category 1')).toBeInTheDocument()
		expect(screen.getByText('Product 2')).toBeInTheDocument()
		expect(screen.getByText('Category 2')).toBeInTheDocument()
	})

	it('should paginate to next and previous page', async () => {
		const wrapper = render(<ProductTable />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			),
		})

		const nextPageButton = screen.getByTestId('next-page')
		await userEvent.click(nextPageButton)

		wrapper.debug()

		expect(await screen.findByText('Product 20')).toBeInTheDocument()

		const previousPageButton = screen.getByTestId('previous-page')
		await userEvent.click(previousPageButton)

		expect(await screen.findByText('Product 1')).toBeInTheDocument()
	})
})
