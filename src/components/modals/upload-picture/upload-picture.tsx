import 'react-image-crop/dist/ReactCrop.css';

import styled from 'styled-components';
import React from 'react';
import { Button } from '@mui/material';
import ReactCrop, {
	centerCrop,
	Crop,
	makeAspectCrop,
} from 'react-image-crop';
import { AlertType } from 'mui-file-dropzone';
import { toast } from 'react-toastify';
import { clamp } from 'lodash';
import useAxios from 'axios-hooks';
import { ModalLayout } from '../layout';
import { changeModals, NModals } from '../modals';
import { FileDropAdvanced } from '../../file-drop-advanced';
import cropImage from '../../../utils/crop-image';
import {
	API_ROUTES,
	CLOUDINARY_API_ROUTES,
} from '../../../routes';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { CLOUDINARY_KEY } from '../../../const';
import { useDispatch } from '../../../store/store';
import { fetchUser } from '../../../store/slices/user';
import { Auth } from '../../../utils/auth';

const pages: NModalUploadPicture.IPage[] = [
	{
		label: 'Upload',
		value: 'upload',
	},
	{
		label: 'Crop',
		value: 'crop',
	},
];

const allowedImages = ['image/jpeg', 'image/png'];
const sizeLimit = 1e7;

const name = 'ModalUploadPicture';
const Modal = (
	props: NModalUploadPicture.IProps,
) => {
	const dispatch = useDispatch();

	const [page, setPage] =
		React.useState<NModalUploadPicture.IPage>(
			pages[0],
		);
	const [crop, setCrop] = React.useState<Crop>();
	const [file, setFile] =
		React.useState<File | null>(null);
	const [filePreview, setFilePreview] =
		React.useState<string | null>(null);

	const [
		{ loading: loadingRequestUploadPicture },
		requestUploadPicture,
	] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.requestUploadPicture,
		},
		{ manual: true, autoCancel: true },
	);

	const [
		{ loading: loadingUploadPicture },
		uploadPicture,
	] = useAxios(
		{
			method: 'POST',
			url: CLOUDINARY_API_ROUTES.upload,
		},
		{ manual: true, autoCancel: true },
	);

	const handleSave = async () => {
		if (!file || !crop) return;

		const image = await cropImage({
			file,
			crop,
			resize: {
				w: 256,
				h: 256,
			},
		});

		try {
			const uploadRequest =
				await requestUploadPicture({
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				});
			const uploadRequestData =
				uploadRequest?.data?.data;

			const formData = new FormData();
			formData.append('file', image);
			formData.append('api_key', CLOUDINARY_KEY);
			formData.append(
				'timestamp',
				uploadRequestData?.timestamp,
			);
			formData.append(
				'signature',
				uploadRequestData?.signature,
			);
			formData.append(
				'folder',
				uploadRequestData?.folder,
			);
			formData.append(
				'public_id',
				uploadRequestData?.public_id,
			);
			await uploadPicture({
				data: formData,
			});

			window.dispatchEvent(
				changeModals({
					[name]: null,
					ModalChangePicture: null,
				}),
			);
			toast('Picture changed', {
				type: 'success',
			});
			dispatch(fetchUser());
		} catch (err) {
			toast('Failed to upload image', {
				type: 'error',
			});
		}
	};

	const handleNextPage = () => {
		setPage(
			pages[
				clamp(
					pages.findIndex(
						(fi) => fi.value === page.value,
					) + 1,
					0,
					pages.length - 1,
				)
			],
		);
	};

	const handlePreviousPage = () => {
		setPage(
			pages[
				clamp(
					pages.findIndex(
						(fi) => fi.value === page.value,
					) - 1,
					0,
					pages.length - 1,
				)
			],
		);
	};

	const handleImageChange = (files: File[]) => {
		if (files?.[0]) {
			setFile(files?.[0]);
		}
	};

	const handleImageAlert = (
		message: string,
		variant: AlertType,
	) => {
		if (variant !== 'success')
			toast(message, {
				type: variant,
			});
	};

	const onImageLoad: React.ReactEventHandler<
		HTMLImageElement
	> = (e) => {
		const {
			naturalWidth: width,
			naturalHeight: height,
		} = e.currentTarget;

		const cropLoad = centerCrop(
			makeAspectCrop(
				{
					unit: '%',
					width: 100,
				},
				1,
				width,
				height,
			),
			width,
			height,
		);

		setCrop(cropLoad);
	};

	React.useEffect(() => {
		if (file) {
			setFilePreview(URL.createObjectURL(file));
		} else {
			setFilePreview(null);
		}
	}, [file]);

	return (
		<ModalLayout
			{...props}
			showHeader
			title={
				page.value === 'upload'
					? 'Upload picture'
					: 'Crop picture'
			}
			opacity="invisible"
			blur={2}
			name={name}
			width="500px"
		>
			<ModalUploadPictureStyle>
				<div className="content">
					{page.value === 'upload' ? (
						<FileDropAdvanced
							preview
							defaultPreviewImage={
								filePreview || undefined
							}
							fileDropProps={{
								props: {
									dropzoneProps: {
										onChange: handleImageChange,
										acceptedFiles: allowedImages,
										dropzoneText:
											'Choose or Drop',
										filesLimit: 1,
										maxFileSize: sizeLimit,
										onAlert: handleImageAlert,
										fileObjects: [],
									},
								},
							}}
						/>
					) : (
						<ReactCrop
							crop={crop}
							aspect={1}
							keepSelection
							onChange={(_, c) => setCrop(c)}
						>
							<img
								className="cropping-image"
								alt="preview"
								src={filePreview || ''}
								onLoad={onImageLoad}
							/>
						</ReactCrop>
					)}
				</div>
				<div className="modal-footer">
					<div className="modal-footer-left">
						{page.value !== 'upload' && (
							<Button
								disabled={
									loadingRequestUploadPicture ||
									loadingUploadPicture
								}
								onClick={handlePreviousPage}
							>
								Back
							</Button>
						)}
					</div>
					<div className="modal-footer-right">
						<Button
							disabled={
								loadingRequestUploadPicture ||
								loadingUploadPicture
							}
							onClick={
								page.value === 'upload'
									? handleNextPage
									: handleSave
							}
						>
							{page.value === 'upload'
								? 'Next'
								: 'Save'}
						</Button>
					</div>
				</div>
			</ModalUploadPictureStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalUploadPicture {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		//
	}
	export interface IPage {
		label: string;
		value: string;
	}
}

const ModalUploadPictureStyle = styled.div`
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		.file-drop-container {
			width: 250px;
			aspect-ratio: 1/1;
		}
		.cropping-image {
			max-width: 100%;
			height: auto;
			display: block;
			object-fit: contain;
		}
	}
	.modal-footer {
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
		.modal-footer-right {
			display: flex;
			justify-content: flex-end;
		}
	}
`;
