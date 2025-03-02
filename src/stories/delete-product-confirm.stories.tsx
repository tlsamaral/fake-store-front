import { DeleteProductConfirm } from '@/app/(home)/(products)/components/delete-product-confirm'
import { ThemeProvider } from '@/components/theme-provider'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import type { Meta, StoryObj } from '@storybook/react'
import { Trash } from 'lucide-react'
import { http, HttpResponse } from 'msw'

const meta: Meta<typeof DeleteProductConfirm> = {
	title: 'Overlay/DeleteProductConfirm',
	component: DeleteProductConfirm,
	args: {
		title: 'Delete Item',
		description: 'Are you sure you want to delete this item?',
	},
	decorators: [
		(Story) => (
			<AlertDialog open>
				<Story />
			</AlertDialog>
		),
	],
}

export default meta
type Story = StoryObj<typeof DeleteProductConfirm>

export const Default: Story = {}

export const DarkMode: Story = {
	decorators: [
		(Story) => (
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem={false}
				disableTransitionOnChange
			>
				<AlertDialog open>
					<Story />
				</AlertDialog>
			</ThemeProvider>
		),
	],
}

export const LightMode: Story = {
	decorators: [
		(Story) => (
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem={false}
				disableTransitionOnChange
			>
				<AlertDialog open>
					<Story />
				</AlertDialog>
			</ThemeProvider>
		),
	],
}

export const WithTriggerButton: Story = {
	decorators: [
		(Story) => (
			<AlertDialog>
				<AlertDialogTrigger asChild>
					<Button size="sm" variant="destructive">
						<Trash className="size-4" />
						Delete
					</Button>
				</AlertDialogTrigger>
				<Story />
			</AlertDialog>
		),
	],
}
