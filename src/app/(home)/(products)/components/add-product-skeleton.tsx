import { fetchCategories } from '@/app/http/fetch-categories'

import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

export function AddProductSkeleton() {
	return (
		<div className="grid gap-2 mt-2 py-4">
			<div className="grid items-center gap-2 mt-2">
				<Label htmlFor="title">Title</Label>
				<Skeleton className="h-9" />
			</div>
			<div className="grid items-center gap-2 mt-2">
				<Label htmlFor="price">Price</Label>
				<Skeleton className="h-9" />
			</div>
			<div className="grid items-center gap-2 mt-2">
				<Label htmlFor="category">Category</Label>
				<Skeleton className="h-9" />
			</div>
			<div className="grid items-center gap-2 mt-2">
				<Label htmlFor="description">Description</Label>
				<Skeleton className="h-11" />
			</div>
		</div>
	)
}
