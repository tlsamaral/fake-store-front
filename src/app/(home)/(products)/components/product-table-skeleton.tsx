import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { Star } from 'lucide-react'

export function ProductTableSkeleton() {
	return Array.from({ length: 10 }).map((_, index) => (
		<TableRow key={index}>
			<TableCell>
				<Skeleton className="h-9 w-9" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-7 w-4" />
			</TableCell>
			<TableCell>
				<Skeleton className="w-14 h-14 rounded-lg" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-7 w-44" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-7 w-24" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-7 w-12" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-7 w-16" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-9 w-16" />
			</TableCell>
			<TableCell>
				<Skeleton className="h-9 w-16" />
			</TableCell>
		</TableRow>
	))
}
