import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import type { Product } from '../page'
import { ProductDetails } from './product-details'

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

describe('ProductDetails', () => {
	it('should render correctly', () => {
		const wrapper = render(
			<Dialog>
				<DialogTrigger asChild>
					<Button>View product</Button>
				</DialogTrigger>
				<ProductDetails product={product} />
			</Dialog>,
		)

		const openButton = wrapper.getByText('View product')
		expect(openButton).toBeInTheDocument()
	})

	it('should display product details', () => {
		const wrapper = render(
			<Dialog open>
				<ProductDetails product={product} />
			</Dialog>,
		)

		expect(wrapper.getByText('Test Product')).toBeInTheDocument()
		expect(wrapper.getByText('Test Description')).toBeInTheDocument()
		expect(wrapper.getByText('Test Category')).toBeInTheDocument()
		expect(wrapper.getByText('US$ 9,99')).toBeInTheDocument()
	})
})
