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
}

export function DeleteProductConfirm({
	title,
	description,
}: DeleteProductConfirmProps) {
	return (
		<AlertDialogContent>
			<AlertDialogHeader>
				<AlertDialogTitle>{title}</AlertDialogTitle>
				<AlertDialogDescription>{description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>Cancelar</AlertDialogCancel>
				<AlertDialogAction>Continuar</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	)
}
