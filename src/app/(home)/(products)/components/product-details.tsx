import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

export function ProductDetails() {
	return (
		<DialogContent className="sm:max-w-[525px]">
			<DialogHeader>
				<DialogTitle>Produto: Teste</DialogTitle>
				<DialogDescription>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis fuga
					cum asperiores dolore debitis officiis. Mollitia eum, repellat
					deleniti dolorum error ut corporis iusto voluptate totam labore nihil
					illo architecto.
				</DialogDescription>
			</DialogHeader>

			<Table>
				<TableBody>
					<TableRow>
						<TableCell className="text-muted-foreground">Categoria</TableCell>
						<TableCell className="flex justify-end">
							categoria_produto
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">Preço</TableCell>
						<TableCell className="flex justify-end">R$ 20,00</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">Avaliação</TableCell>
						<TableCell className="flex justify-end">4.5</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</DialogContent>
	)
}
