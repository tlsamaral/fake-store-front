import { fetchCategories } from '@/app/http/fetch-categories'
import { Button } from '@/components/ui/button'
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useQuery } from '@tanstack/react-query'
import { AddProductSkeleton } from './add-product-skeleton'

export function AddProduct() {
	const { data: categories, isLoading: categoriesLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	})

	return (
		<DialogContent className="sm:max-w-[525px]">
			<DialogHeader>
				<DialogTitle>Create a new product</DialogTitle>
				<DialogDescription>
					On here you can create a new product.
				</DialogDescription>
			</DialogHeader>
			{categoriesLoading ? (
				<AddProductSkeleton />
			) : (
				<div className="grid gap-2 mt-2 py-4">
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="title">Title</Label>
						<Input id="title" placeholder="Product title" />
					</div>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="price">Price</Label>
						<Input id="price" placeholder="Product price" />
					</div>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="category">Category</Label>
						<Select>
							<SelectTrigger id="category">
								<SelectValue placeholder="Select a category" />
							</SelectTrigger>
							<SelectContent>
								{categories?.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="description">Description</Label>
						<Textarea id="description" placeholder="Write a description" />
					</div>
				</div>
			)}
			<DialogFooter>
				<Button type="submit">Create product</Button>
			</DialogFooter>
		</DialogContent>
	)
}
