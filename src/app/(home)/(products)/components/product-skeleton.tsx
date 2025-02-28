import { Skeleton } from '@/components/ui/skeleton'

export function ProuductSkeleton() {
	return (
		<div className="grid gap-2 mt-2 py-4">
			<div className="grid items-center gap-2 mt-2">
				<Skeleton className="h-5 w-11" />
				<Skeleton className="h-9 w-full" />
			</div>
			<div className="grid items-center gap-2 mt-2">
				<Skeleton className="h-5 w-11" />
				<Skeleton className="h-9 w-full" />
			</div>
			<div className="grid items-center gap-2 mt-2">
				<Skeleton className="h-5 w-11" />
				<Skeleton className="h-9 w-full" />
			</div>
			<div className="grid items-center gap-2 mt-2">
				<Skeleton className="h-5 w-14" />
				<Skeleton className="h-12 w-full" />
			</div>
		</div>
	)
}
