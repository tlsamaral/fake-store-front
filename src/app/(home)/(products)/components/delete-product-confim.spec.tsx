import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { fireEvent, render } from '@testing-library/react'
import { DeleteProductConfirm } from './delete-product-confirm'

import '@testing-library/jest-dom'

describe('DeleteProductConfirm', () => {
	it('should render correctly', () => {
		const wrapper = render(
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button>Open</Button>
				</AlertDialogTrigger>
				<DeleteProductConfirm
					title="Test Title"
					description="Test Description"
					onConfirm={() => {}}
				/>
			</AlertDialog>,
		)

		const openButton = wrapper.getByText('Open')

		expect(openButton).toBeTruthy()
	})

	it('should display title and description', () => {
		const wrapper = render(
			<AlertDialog open>
				<DeleteProductConfirm
					title="Delete Item"
					description="Are you sure?"
					onConfirm={() => {}}
				/>
			</AlertDialog>,
		)

		expect(wrapper.getByText('Delete Item')).toBeInTheDocument()
		expect(wrapper.getByText('Are you sure?')).toBeInTheDocument()
	})

	it('should open the modal when clicking the trigger button', () => {
		const wrapper = render(
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button>Open</Button>
				</AlertDialogTrigger>
				<DeleteProductConfirm
					title="Confirm Delete"
					description="This action is irreversible."
					onConfirm={() => {}}
				/>
			</AlertDialog>,
		)

		const openButton = wrapper.getByText('Open')
		expect(openButton).toBeInTheDocument()

		fireEvent.click(openButton)

		expect(wrapper.getByText('Confirm Delete')).toBeInTheDocument()
		expect(
			wrapper.getByText('This action is irreversible.'),
		).toBeInTheDocument()
	})

	it('should call onConfirm when clicking the confirm button', () => {
		const onConfirmMock = jest.fn()

		const wrapper = render(
			<AlertDialog open>
				<DeleteProductConfirm
					title="Confirm"
					description="Confirm delete?"
					onConfirm={onConfirmMock}
				/>
			</AlertDialog>,
		)

		const confirmButton = wrapper.getByText('Continue')
		fireEvent.click(confirmButton)

		expect(onConfirmMock).toHaveBeenCalledTimes(1)
	})
})
