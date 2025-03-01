import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { NavLink } from './nav-link' // Certifique-se de importar corretamente o componente

import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
	useRouter: jest.fn(),
}))

describe('NavLink', () => {
	it('should render correctly', () => {
		;(useRouter as jest.Mock).mockReturnValue({ pathname: '/dashboard' })

		const wrapper = render(<NavLink href="/dashboard">Dashboard</NavLink>)

		const link = wrapper.getByRole('link', { name: 'Dashboard' })

		expect(link).toBeInTheDocument()
	})

	it('should not be active if the current route is not the same as the href', async () => {
		const pushMock = jest.fn()
		;(useRouter as jest.Mock).mockReturnValue({
			push: pushMock,
			pathname: '/dashboard',
		})

		const wrapper = render(<NavLink href="/dashboard">Dashboard</NavLink>)

		const link = wrapper.getByRole('link', { name: 'Dashboard' })
		expect(link).toHaveAttribute('data-current', 'false')
	})
})
