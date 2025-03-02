import { ProductTable } from '@/app/(home)/(products)/components/products-table'
import type { Product } from '@/app/http/get-product'
import { ThemeProvider } from '@/components/theme-provider'
import { Dialog } from '@/components/ui/dialog'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import { mswDecorator } from 'msw-storybook-addon'
import React from 'react'

const queryClient = new QueryClient()

const products: Product[] = []
for (let i = 0; i < 30; i++) {
	products.push({
		id: i + 1,
		title: `Product ${i + 1}`,
		description: `Description ${i + 1}`,
		category: `Category ${i + 1}`,
		price: 9.99,
		image: 'https://github.com/tlsamaral.png',
		rating: {
			rate: i === 0 ? 4.6 : 3.5,
			count: 10,
		},
	})
}

const meta: Meta<typeof ProductTable> = {
	title: 'Tables/ProductsTable',
	component: ProductTable,
	parameters: {
		msw: {
			handlers: [
				http.get<never, never, string[]>('/products/categories', () => {
					return HttpResponse.json(
						['Category 1', 'Category 2', 'Category 3', 'Category 4'],
						{ status: 200 },
					)
				}),
			],
		},
	},
	args: {
		products,
	},
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<Dialog open>
					<Story />
				</Dialog>
			</QueryClientProvider>
		),
	],
}

export default meta
type Story = StoryObj<typeof ProductTable>

export const Default: Story = {}

export const DarkMode: Story = {
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					disableTransitionOnChange
				>
					<Dialog open>
						<Story />
					</Dialog>
				</ThemeProvider>
			</QueryClientProvider>
		),
	],
}

export const LightMode: Story = {
	decorators: [
		(Story) => (
			<QueryClientProvider client={queryClient}>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem={false}
					disableTransitionOnChange
				>
					<Dialog open>
						<Story />
					</Dialog>
				</ThemeProvider>
			</QueryClientProvider>
		),
	],
}
