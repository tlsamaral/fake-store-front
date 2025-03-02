import { AddProduct } from '@/app/(home)/(products)/components/add-product'
import { ThemeProvider } from '@/components/theme-provider'
import { Dialog } from '@/components/ui/dialog'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, HttpResponse } from 'msw'
import React from 'react'

const queryClient = new QueryClient()

const meta: Meta<typeof AddProduct> = {
	title: 'Overlay/AddProduct',
	component: AddProduct,
	parameters: {
		msw: {
			handlers: [
				http.get<never, never, string[]>('/api/categories', () => {
					return HttpResponse.json(
						['Electronics', 'Clothing', 'Home & Kitchen', 'Toys'],
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
type Story = StoryObj<typeof AddProduct>

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
