import { Crop } from 'react-image-crop';

export default (props: NCropImage.IProps) => {
	const { file, crop, resize } = props;

	return new Promise<Blob>((resolve, reject) => {
		const img = new Image();
		const reader = new FileReader();

		reader.onload = () => {
			if (typeof reader.result !== 'string') {
				reject(new Error('Invalid file result'));
			} else {
				img.src = reader.result;
			}
		};

		img.onload = () => {
			// Ensure crop values are defined
			if (!crop.width || !crop.height) {
				reject(
					new Error('Invalid crop dimensions'),
				);
				return;
			}

			// Determine if crop values are in percentage
			const isPercent =
				crop.unit === '%' || !crop.unit;

			// Convert crop values to pixel units if needed
			const cropX = isPercent
				? (crop.x / 100) * img.naturalWidth
				: crop.x;
			const cropY = isPercent
				? (crop.y / 100) * img.naturalHeight
				: crop.y;
			const cropWidth = isPercent
				? (crop.width / 100) * img.naturalWidth
				: crop.width;
			const cropHeight = isPercent
				? (crop.height / 100) * img.naturalHeight
				: crop.height;

			const targetWidth = resize?.w || cropWidth;
			const targetHeight =
				resize?.h || cropHeight;

			const canvas =
				document.createElement('canvas');
			canvas.width = targetWidth;
			canvas.height = targetHeight;

			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(
					new Error(
						'Failed to get canvas context',
					),
				);
				return;
			}

			ctx.drawImage(
				img,
				cropX,
				cropY,
				cropWidth,
				cropHeight,
				0,
				0,
				targetWidth,
				targetHeight,
			);

			canvas.toBlob(
				(blob) => {
					if (!blob)
						reject(new Error('Canvas is empty'));
					else resolve(blob);
				},
				'image/webp',
				0.8,
			);
		};

		img.onerror = reject;
		reader.onerror = reject;

		reader.readAsDataURL(file);
	});
};

export namespace NCropImage {
	export interface IProps {
		file: File;
		crop: Crop;
		resize?: {
			w: number;
			h: number;
		};
	}
}
