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

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import type { Product } from '../page'
import { AddProduct } from './add-product'
import { DeleteProductConfirm } from './delete-product-confirm'
import { EditProduct } from './edit-product'
import { ProductDetails } from './product-details'

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
			return <p className="font-medium text-center">{row.getValue('price')}</p>
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
							Editar
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
			const product = row.original
			return (
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button size="sm" variant="destructive">
							<Trash className="size-4" />
							Excluir
						</Button>
					</AlertDialogTrigger>
					<DeleteProductConfirm
						title="Você tem certeza?"
						description={`Você quer excluir o produto ${product.title}, com id ${product.id}?`}
					/>
				</AlertDialog>
			)
		},
	},
]

interface DataTableProps {
	products: Product[]
}

export function ProductTable({ products: data }: DataTableProps) {
	const [sorting, setSorting] = React.useState<SortingState>([])
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	)
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = React.useState({})

	const table = useReactTable({
		data,
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
		},
		initialState: {
			sorting: [{ id: 'rating.rate', desc: true }],
		},
	})

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

				<Select>
					<SelectTrigger className="w-[180px] ml-2">
						<SelectValue placeholder="Category" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="category-1">Category 1</SelectItem>
						<SelectItem value="category-2">Category 2</SelectItem>
						<SelectItem value="category-3">Category 3</SelectItem>
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
						{table.getRowModel().rows?.length ? (
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
				<div className="flex-1 text-sm text-muted-foreground">
					{table.getFilteredSelectedRowModel().rows.length} of{' '}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	)
}
