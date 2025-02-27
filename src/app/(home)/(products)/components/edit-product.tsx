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

export function EditProduct() {
	return (
		<DialogContent className="sm:max-w-[525px]">
			<DialogHeader>
				<DialogTitle>Edit your product</DialogTitle>
				<DialogDescription>
					On here you can edit your product.
				</DialogDescription>
			</DialogHeader>
			<div className="grid gap-2 mt-2 py-4">
				<div className="grid items-center gap-2 mt-2">
					<Label htmlFor="title">Title</Label>
					<Input id="title" />
				</div>
				<div className="grid items-center gap-2 mt-2">
					<Label htmlFor="price">Price</Label>
					<Input id="price" />
				</div>
				<div className="grid items-center gap-2 mt-2">
					<Label htmlFor="category">Category</Label>
					<Select>
						<SelectTrigger id="category" disabled>
							<SelectValue placeholder="Category" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="category-1">Category 1</SelectItem>
							<SelectItem value="category-2">Category 2</SelectItem>
							<SelectItem value="category-3">Category 3</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="grid items-center gap-2 mt-2">
					<Label htmlFor="description">Description</Label>
					<Textarea id="description" />
				</div>
			</div>
			<DialogFooter>
				<Button type="submit">Save changes</Button>
			</DialogFooter>
		</DialogContent>
	)
}
