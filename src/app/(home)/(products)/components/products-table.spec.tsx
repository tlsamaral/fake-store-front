import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Product } from '../page'
import { ProductTable } from './products-table'

jest.mock('@/app/http/fetch-categories', () => ({
	fetchCategories: jest.fn(() =>
		Promise.resolve(['Electronics', 'Clothing', 'Books']),
	),
}))

describe('Product Table', () => {
	const products: Product[] = []
	beforeAll(() => {
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
	})

	it('should be render correctly', () => {
		const queryClient = new QueryClient()

		const wrapper = render(<ProductTable products={products} />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			),
		})

		const tableRows = wrapper.getAllByRole('row')

		expect(tableRows.length).toBe(11)
	})

	it('should be contain product title and category', async () => {
		const queryClient = new QueryClient()

		const wrapper = render(<ProductTable products={products} />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			),
		})

		expect(wrapper.getByText('Product 1')).toBeInTheDocument()
		expect(wrapper.getByText('Category 1')).toBeInTheDocument()
	})

	it('should be render no results', () => {
		const queryClient = new QueryClient()

		const wrapper = render(<ProductTable products={[]} />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			),
		})

		expect(wrapper.getByText('No results.')).toBeInTheDocument()
	})

	it('should be able paginate to next page', async () => {
		const queryClient = new QueryClient()

		const wrapper = render(<ProductTable products={products} />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			),
		})

		const nextPageButton = wrapper.getByTestId('next-page')
		await userEvent.click(nextPageButton)

		expect(wrapper.getByText('Product 20')).toBeInTheDocument()
	})

	it('should be able paginate to previous page', async () => {
		const queryClient = new QueryClient()

		const wrapper = render(<ProductTable products={products} />, {
			wrapper: ({ children }) => (
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			),
		})

		const nextPageButton = wrapper.getByTestId('next-page')
		await userEvent.click(nextPageButton)

		expect(wrapper.getByText('Product 20')).toBeInTheDocument()

		const previousPageButton = wrapper.getByTestId('previous-page')
		await userEvent.click(previousPageButton)

		expect(wrapper.getByText('Product 1')).toBeInTheDocument()
	})
})
