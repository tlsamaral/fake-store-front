import { getProduct } from '@/app/http/get-product'
import { updateProduct } from '@/app/http/update-product'
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
import { currencyFormatter } from '@/utils/currency-formatter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { ProuductSkeleton } from './product-skeleton'

interface EditProductProps {
	productId: number
	open: boolean
}

const updateProductSchema = z.object({
	title: z.string(),
	description: z.string(),
	price: z.string(),
})

// Aqui poderia ser utilizado o metodos (input/output) do react-hook-form para poder inferir os valores antes e depois do transform, porém como está funcionalidade está com bug de tipagem, irei deixar sem fazer o transform no price, vou fazer no metodo de submit para que não tenha nenhum erro no código.
// type UpdateProductInput = z.input<typeof updateProductSchema>

// type UpdateProductOutput = z.input<typeof updateProductSchema>

type UpdateProductData = z.infer<typeof updateProductSchema>

export function EditProduct({ open, productId }: EditProductProps) {
	const { data: product, isLoading: productLoading } = useQuery({
		queryKey: ['products', productId],
		queryFn: () => getProduct(productId),
		enabled: open,
	})

	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<UpdateProductData>({
		resolver: zodResolver(updateProductSchema),
		values: {
			title: product?.title || '',
			description: product?.description || '',
			price: currencyFormatter.format(product?.price ?? 0),
		},
	})

	const { mutateAsync: updateProductFn, isPending } = useMutation({
		mutationKey: ['update-product'],
		mutationFn: updateProduct,
	})

	async function submitUpdateProduct(data: UpdateProductData) {
		try {
			await updateProductFn({
				id: productId,
				title: data.title,
				description: data.description,
				price: Number(data.price),
			})

			toast.success('Product updated!')
		} catch (error) {
			toast.error('Something went wrong!')
		}
	}

	return (
		<DialogContent className="sm:max-w-[525px]">
			<DialogHeader>
				<DialogTitle>Edit your product</DialogTitle>
				<DialogDescription>
					On here you can edit your product.
				</DialogDescription>
			</DialogHeader>
			{productLoading ? (
				<ProuductSkeleton />
			) : (
				<form
					className="grid gap-2 mt-2 py-4"
					onSubmit={handleSubmit(submitUpdateProduct)}
					id="edit-product-form"
				>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="title">Title</Label>
						<Input id="title" {...register('title')} />
					</div>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="price">Price</Label>

						<Controller
							name="price"
							control={control}
							render={({ field }) => {
								return (
									<Input
										id="price"
										type="text"
										value={field.value}
										onChange={(event) => {
											let cleanValue = event.target.value.replace(/[^\d]/g, '')
											cleanValue = (Number(cleanValue) / 100).toFixed(2)

											field.onChange(
												currencyFormatter.format(Number(cleanValue)),
											)
										}}
									/>
								)
							}}
						/>
					</div>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="category">Category</Label>
						<Select value={product?.category ?? ''}>
							<SelectTrigger id="category" disabled>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={product?.category ?? ''}>
									{product?.category}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="description">Description</Label>
						<Textarea id="description" {...register('description')} />
					</div>
				</form>
			)}
			<DialogFooter>
				<Button type="submit" form="edit-product-form" disabled={isPending}>
					Save changes
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
