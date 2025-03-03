import { Button } from '@/components/ui/button'
import { Package, Trash, Upload } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface ImageUploaderProps {
	onImageChange: (url: string | null) => void
}

export function ImageUploader({ onImageChange }: ImageUploaderProps) {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0] || null

		if (file) {
			if (previewUrl) {
				URL.revokeObjectURL(previewUrl)
			}
			const tempUrl = URL.createObjectURL(file)
			setPreviewUrl(tempUrl)
			onImageChange(tempUrl)
		} else {
			setPreviewUrl(null)
			onImageChange(null)
		}
	}

	const handleRemoveImage = () => {
		setPreviewUrl(null)
		onImageChange(null)
	}

	return (
		<div className="grid grid-cols-2 gap-4 h-40 w-full">
			<div className="flex flex-col justify-center gap-3 col-span-1">
				<label
					htmlFor="file"
					className="flex gap-3 items-center cursor-pointer justify-center"
				>
					<Upload className="w-4 h-4" />
					<span className="text-sm font-medium transition-all">
						Choose an image
					</span>
					<input
						type="file"
						id="file"
						accept="image/*"
						className="hidden"
						onChange={handleFileChange}
					/>
				</label>

				{previewUrl && (
					<Button type="button" variant="link" onClick={handleRemoveImage}>
						<Trash className="w-4 h-4" />
						Delete image
					</Button>
				)}
			</div>

			<div className="w-full flex flex-col items-center justify-center gap-2 col-1">
				{previewUrl ? (
					<Image
						src={previewUrl}
						alt="Upload"
						width={60}
						height={60}
						className="object-contain border border-dashed rounded-lg flex-1 w-full max-h-28"
					/>
				) : (
					<div className="flex-1 flex justify-center items-center border border-dashed rounded-lg w-full">
						<Package />
					</div>
				)}
			</div>
		</div>
	)
}
