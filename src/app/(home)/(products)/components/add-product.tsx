import { createProduct } from '@/app/http/create-product'
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
import { currencyFormatter } from '@/utils/currency-formatter'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import type { Product } from '../page'
import { AddProductSkeleton } from './add-product-skeleton'

const createProductSchema = z.object({
	title: z
		.string()
		.min(3, 'Title must be at least 3 characters long')
		.max(30, 'Title must be at most 30 characters long'),
	description: z
		.string()
		.min(3, 'Description must be at least 3 characters long'),
	price: z.string().min(1, 'Price must be at least 1 characters long'),
	category: z.string().min(1, 'Category must be at least 1 characters long'),
})

type CreateProductData = z.infer<typeof createProductSchema>

export function AddProduct() {
	const queryClient = useQueryClient()

	const { data: categories, isLoading: categoriesLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	})

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, isValid, errors },
		control,
		watch,
	} = useForm({
		resolver: zodResolver(createProductSchema),
		defaultValues: {
			title: '',
			description: '',
			price: currencyFormatter.format(0),
			category: '',
		},
	})

	const { mutateAsync: updateProductFn, isPending } = useMutation({
		mutationKey: ['create-product'],
		mutationFn: createProduct,
	})

	async function submitCreateProduct(data: CreateProductData) {
		try {
			// Aqui eu optei por fazer essa transformação manual pois o react hook form está com bug de tipagem quando de usa o input/output do zod. Então para não ficar com erro irei fazer de forma manual :)

			const numericPrice = Number(
				data.price.replace(/[^\d,]/g, '').replace(',', '.'),
			)

			await updateProductFn({
				title: data.title,
				description: data.description,
				price: numericPrice,
				category: data.category,
			})

			toast.success('Product inserted successfully!')
		} catch (error) {
			toast.error('Something went wrong!')
		}
	}

	const productTitle = watch('title')

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
				<form
					id="product-form"
					className="grid gap-2 mt-2 py-4"
					onSubmit={handleSubmit(submitCreateProduct)}
				>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							placeholder="Product title"
							maxLength={30}
							{...register('title')}
						/>
						<div className="flex justify-between gap-2 items-center">
							<span className="text-xs text-red-500">
								{errors.title?.message}
							</span>
							<span className="text-xs">{productTitle?.length} / 30</span>
						</div>
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
						<span className="text-xs text-red-500">
							{errors.price?.message}
						</span>
					</div>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="category">Category</Label>

						<Controller
							name="category"
							control={control}
							render={({ field }) => {
								return (
									<Select onValueChange={field.onChange} value={field.value}>
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
								)
							}}
						/>
						<span className="text-xs text-red-500">
							{errors.category?.message}
						</span>
					</div>
					<div className="grid items-center gap-2 mt-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							placeholder="Write a description"
							{...register('description')}
						/>
						<span className="text-xs text-red-500">
							{errors.description?.message}
						</span>
					</div>
				</form>
			)}
			<DialogFooter>
				<Button
					type="submit"
					form="product-form"
					disabled={!isValid || isSubmitting}
				>
					Create product
				</Button>
			</DialogFooter>
		</DialogContent>
	)
}
