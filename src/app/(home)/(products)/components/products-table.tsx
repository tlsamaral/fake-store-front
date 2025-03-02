'use client'

import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table'
import {
	ArrowUpDown,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
	PackagePlus,
	Pencil,
	Search,
	Star,
	Trash,
} from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'

import { deleteProduct } from '@/app/http/delete-product'
import { fetchCategories } from '@/app/http/fetch-categories'
import { fetchProducts } from '@/app/http/fetch-products'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { currencyFormatter } from '@/utils/currency-formatter'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { toast } from 'sonner'
import type { Product } from '../page'
import { AddProduct } from './add-product'
import { DeleteProductConfirm } from './delete-product-confirm'
import { EditProduct } from './edit-product'
import { ProductDetails } from './product-details'
import { ProductTableSkeleton } from './product-table-skeleton'

export const columns: ColumnDef<Product>[] = [
	{
		id: 'search',
		header: '',
		cell: ({ row }) => {
			const product = row.original
			return (
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="ghost" size="icon">
							<Search className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<ProductDetails product={product} />
				</Dialog>
			)
		},
	},
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => (
			<span className="capitalize font-mono">{row.getValue('id')}</span>
		),
	},
	{
		accessorKey: 'image',
		header: ({ column }) => <p className="text-center">Image</p>,
		cell: ({ row }) => (
			<div className="flex items-center justify-center">
				<Image
					src={row.getValue('image')}
					alt={row.getValue('title')}
					width={60}
					height={60}
					className="object-cover w-14 h-14 rounded-lg"
					priority
				/>
			</div>
		),
	},
	{
		accessorKey: 'title',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<ArrowUpDown className="h-3 w-3" />
					Title
				</Button>
			)
		},
		cell: ({ row }) => (
			<span className="lowercase  w-[120px]">{row.getValue('title')}</span>
		),
	},
	{
		accessorKey: 'category',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<ArrowUpDown className="h-3 w-3" />
					Category
				</Button>
			)
		},
		cell: ({ row }) => (
			<span className=" w-[120px]">{row.getValue('category')}</span>
		),
	},
	{
		accessorKey: 'price',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					<ArrowUpDown className="h-3 w-3" />
					Price
				</Button>
			)
		},
		cell: ({ row }) => {
			const { price } = row.original
			const formattedPrice = currencyFormatter.format(price)
			return <p className="font-medium text-center">{formattedPrice}</p>
		},
	},
	{
		id: 'rating.rate',
		accessorKey: 'rating.rate',
		header: () => <div>Rating</div>,
		cell: ({ row }) => {
			const { rating } = row.original

			return (
				<div className="flex flex-col gap-2 w-[120px]">
					<div className="flex items-center">
						{rating.rate > 4.5 && (
							<Star className="h-4 w-4 dark:text-yellow-200 text-yellow-500" />
						)}
						<span className="font-medium text-xs ml-auto">
							{rating.rate} / 5 - {rating.count}
						</span>
					</div>
					<Progress value={(rating.rate / 5) * 100} />
				</div>
			)
		},
	},
	{
		id: 'edit',
		header: () => <div>Edit</div>,
		cell: ({ row }) => {
			const [editDialogOpen, setEditDialogOpen] = React.useState(false)
			return (
				<Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
					<DialogTrigger asChild>
						<Button size="sm" variant="outline">
							<Pencil className="size-4" />
							Edit
						</Button>
					</DialogTrigger>
					<EditProduct productId={row.original.id} open={editDialogOpen} />
				</Dialog>
			)
		},
	},
	{
		id: 'delete',
		header: () => <div>Delete</div>,
		cell: ({ row }) => {
			const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
			const product = row.original

			const { mutateAsync: deleteProductFn, isPending } = useMutation({
				mutationKey: ['delete-product'],
				mutationFn: deleteProduct,
			})

			async function handleDelete() {
				try {
					await deleteProductFn({ productId: product.id })
					setDeleteDialogOpen(false)
					toast.success('Product deleted!')
				} catch {
					toast.error('Something went wrong!')
				}
			}

			return (
				<AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
					<AlertDialogTrigger asChild>
						<Button size="sm" variant="destructive">
							<Trash className="size-4" />
							Delete
						</Button>
					</AlertDialogTrigger>
					<DeleteProductConfirm
						title="Delete Product?"
						description={`Are you sure you want to delete ${product.title}, with id ${product.id}?`}
						onConfirm={handleDelete}
					/>
				</AlertDialog>
			)
		},
	},
]

// interface DataTableProps {
// 	products: Product[]
// }

export function ProductTable() {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})
	const [categoryFilter, setCategoryFilter] = React.useState('')

	const { data: products, isLoading: productsLoading } = useQuery({
		queryKey: ['products'],
		queryFn: fetchProducts,
	})

	const sortedProducts =
		products?.sort((a: Product, b: Product) => {
			if (b.rating.rate >= 4.5 && a.rating.rate < 4.5) return 1
			if (a.rating.rate >= 4.5 && b.rating.rate < 4.5) return -1

			return b.rating.rate - a.rating.rate
		}) ?? []

	const table = useReactTable({
		data: sortedProducts,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
			globalFilter: categoryFilter,
		},
		initialState: {
			sorting: [{ id: 'rating.rate', desc: true }],
		},
	})

	const { data: categories, isLoading: categoriesLoading } = useQuery({
		queryKey: ['categories'],
		queryFn: fetchCategories,
	})

	function filterByCategory(category: string) {
		if (category === 'All') {
			setCategoryFilter('')
			return
		}
		setCategoryFilter(category)
	}

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter products by title..."
					value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('title')?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>

				<Select
					onValueChange={filterByCategory}
					value={categoryFilter}
					disabled={categoriesLoading}
				>
					<SelectTrigger
						className="w-[180px] ml-2"
						data-testid="category-filter"
					>
						<SelectValue placeholder="Select a category">
							{categoriesLoading ? (
								<Skeleton className="h-4 w-12" />
							) : (
								(categoryFilter ?? 'All')
							)}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{categories?.map((category) => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" className="ml-auto">
							<PackagePlus className="mr-1 h-4 w-4 dark:text-purple-300 text-purple-500" />
							New Product
						</Button>
					</DialogTrigger>
					<AddProduct />
				</Dialog>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{productsLoading ? (
							<ProductTableSkeleton />
						) : table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						data-testid="previous-page"
					>
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Previous page</span>
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						data-testid="next-page"
					>
						<ChevronRight className="h-4 w-4" />
						<span className="sr-only">Next page</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
