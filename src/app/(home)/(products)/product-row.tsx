import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { TableCell, TableRow } from '@/components/ui/table'
import { Pencil, Search, Star, Trash } from 'lucide-react'
import Image from 'next/image'
import type { Product } from './page'
import { ProductDetails } from './product-details'

interface ProductRowProps {
	product: Product
}
export function ProductRow({ product }: ProductRowProps) {
	return (
		<TableRow>
			<TableCell>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="icon">
							<Search className="size-4" />
						</Button>
					</DialogTrigger>
					<ProductDetails />
				</Dialog>
			</TableCell>
			<TableCell className="font-medium">{product.id}</TableCell>
			<TableCell className="font-medium">
				<Image
					src={product.image}
					alt={product.title}
					width={80}
					height={80}
					className="w-14 h-14 rounded-lg object-cover"
				/>
			</TableCell>
			<TableCell>
				<strong>{product.title}</strong>
				<p className="text-xs">{product.description}</p>
			</TableCell>
			<TableCell className="font-medium">{product.category}</TableCell>
			<TableCell className="font-medium">{product.price}</TableCell>
			<TableCell className="font-medium">
				<div className="flex items-center gap-2 mb-1">
					<Star className="size-4" /> 3.7
				</div>{' '}
				<Progress value={50} />
			</TableCell>
			<TableCell className="font-medium">
				<Button size="sm" variant="outline">
					<Pencil className="size-4" />
					Editar
				</Button>
			</TableCell>
			<TableCell className="font-medium">
				<Button size="sm" variant="destructive">
					<Trash className="size-4" />
					Excluir
				</Button>
			</TableCell>
		</TableRow>
	)
}
