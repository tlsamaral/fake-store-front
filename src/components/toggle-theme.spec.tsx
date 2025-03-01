import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from './theme-provider'
import { ToggleTheme } from './toggle-theme'

describe('Toggle Theme', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(),
				removeListener: jest.fn(),
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		})
	})

	it('should render the toggle button', () => {
		render(<ToggleTheme />, {
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
		})

		const button = screen.getByRole('button', { name: /toggle theme/i })
		expect(button).toBeInTheDocument()
	})

	it('should open theme selection menu on button click', async () => {
		render(<ToggleTheme />, {
			wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
		})

		const user = userEvent.setup()

		const button = screen.getByRole('button', { name: /toggle theme/i })
		await user.click(button)

		expect(screen.getByTestId('light')).toBeInTheDocument()
		expect(screen.getByTestId('dark')).toBeInTheDocument()
		expect(screen.getByTestId('system')).toBeInTheDocument()
	})
})
