import { getProduct } from '@/app/http/get-product'
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
import { useQuery } from '@tanstack/react-query'
import type { Product } from '../page'

interface ProductDetailsProps {
	product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
	return (
		<DialogContent className="sm:max-w-[525px]">
			<DialogHeader>
				<DialogTitle>Product Details</DialogTitle>
				<DialogDescription>
					View detailed information about the selected product, including price,
					description, and ratings.
				</DialogDescription>
			</DialogHeader>

			<div className="grid pb-3 border-b">
				<strong className="text-sm">Title</strong>
				<span className="text-xs">{product.title}</span>
			</div>
			<div className="grid pb-3 border-b">
				<strong className="text-sm">Description</strong>
				<span className="text-xs">{product.description}</span>
			</div>
			<Table>
				<TableBody>
					<TableRow>
						<TableCell className="text-muted-foreground">Categoria</TableCell>
						<TableCell className="flex justify-end">
							{product.category}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">Preço</TableCell>
						<TableCell className="flex justify-end">{product.price}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">Avaliação</TableCell>
						<TableCell className="flex justify-end">{`${product.rating.rate} / 5 - ${product.rating.count}`}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</DialogContent>
	)
}
