import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface DeleteProductConfirmProps {
	title: string
	description: string
	onConfirm: () => void
}

export function DeleteProductConfirm({
	title,
	description,
	onConfirm,
}: DeleteProductConfirmProps) {
	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				<AlertDialogDescription>{description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancel</AlertDialogCancel>
				<AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	)
}
