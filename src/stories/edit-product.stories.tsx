import { EditProduct } from '@/app/(home)/(products)/components/edit-product'
import type { Product } from '@/app/http/get-product'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Edit } from 'lucide-react'
import { http, HttpResponse } from 'msw'
import React from 'react'

const queryClient = new QueryClient()

const meta: Meta<typeof EditProduct> = {
	title: 'Overlay/EditProduct',
	component: EditProduct,
	args: {
		productId: 1,
		open: true,
	},
	parameters: {
		msw: {
			handlers: [
				http.put<never, never, Product>('/products/:id', () => {
					return HttpResponse.json(
						{
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
						},
						{ status: 200 },
					)
				}),
			],
		},
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
type Story = StoryObj<typeof EditProduct>

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

export const WithTriggerButton: Story = {
	decorators: [
		(Story) => (
			<Dialog>
				<DialogTrigger asChild>
					<Button size="sm" variant="outline">
						<Edit className="size-4" />
						Edit
					</Button>
				</DialogTrigger>
				<Story />
			</Dialog>
		),
	],
}
