import React from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import classes from '../../../utils/classes';
import {
	API_ROUTES,
	CLOUDINARY_API_ROUTES,
} from '../../../routes';
import { useAuth } from '../../contexts/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { Auth } from '../../../utils/auth';
import checkUpload from '../../../utils/check-upload';
import buildApiRoute from '../../../utils/build-api-route';

const defaultImage = '1.png';
const images: NModalChangePicture.IImage[] = [
	{
		name: 'Silly cat',
		fileName: '1.png',
	},
	{
		name: 'Silly twat',
		fileName: '2.png',
	},
	{
		name: 'Silly brat',
		fileName: '3.png',
	},
	{
		name: '4',
		fileName: '4.png',
	},
	{
		name: '5',
		fileName: '5.png',
	},
	{
		name: '6',
		fileName: '6.png',
	},
];

const name = 'ModalChangePicture';
const Modal = (
	props: NModalChangePicture.IProps,
) => {
	const authed = useAuth();

	const [selected, setSelected] =
		React.useState<NModalChangePicture.IImage | null>(
			null,
		);
	const [currentImage, setCurrentImage] =
		React.useState<string | null>(null);
	const [custom, setCustom] = React.useState<
		string | null
	>(null);

	const [{ loading: loadingMe }, getMe] =
		useAxios(
			{
				method: 'POST',
				url: API_ROUTES.getMe,
			},
			{ manual: true, autoCancel: true },
		);
	const [, userChangePicture] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.changePicture,
		},
		{ manual: true, autoCancel: true },
	);

	const changePicture = (
		image: NModalChangePicture.IImage,
	) => {
		setSelected(image);
	};

	const uploadCustom = () => {
		window.dispatchEvent(
			changeModals({
				ModalUploadPicture: { open: true },
			}),
		);
	};

	const handleSave = async () => {
		const res = await userChangePicture({
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
			data: {
				picture: selected?.fileName,
			},
		});
		if (
			res?.data?.statusCode === StatusCodes.OK
		) {
			window.dispatchEvent(
				changeModals({ [name]: null }),
			);
			Auth.check();
			toast('Picture changed', {
				type: 'success',
			});
		} else {
			toast('Failed to change picture', {
				type: 'error',
			});
		}
	};

	React.useEffect(() => {
		(async () => {
			if (authed.loaded) {
				if (authed.authed) {
					const res = await getMe({
						headers: {
							Authorization: `Bearer ${Auth.getToken()}`,
							uniqueId: getUniqueId(),
						},
					});
					if (res?.data?.data?.user?.picture) {
						setSelected(
							images.find(
								(f) =>
									f.fileName ===
									res?.data?.data?.user?.picture,
							) || null,
						);
						setCurrentImage(
							res?.data?.data?.user?.picture,
						);
						setCustom(null);
					} else if (
						res?.data?.data?.user?.picture_custom
					) {
						const imagePath = buildApiRoute(
							CLOUDINARY_API_ROUTES.getUpload,
							{
								folder: `pictures`,
								name: `${res?.data?.data?.user?._id}_${res?.data?.data?.user?.picture_custom}.webp`,
							},
						);
						const uploadedImage =
							await checkUpload(imagePath);

						if (uploadedImage) {
							setSelected(null);
							setCurrentImage(null);
							setCustom(imagePath);
						} else {
							setSelected(
								images.find(
									(f) =>
										f.fileName === defaultImage,
								) || null,
							);
							setCurrentImage(defaultImage);
							setCustom(null);
						}
					} else {
						setSelected(
							images.find(
								(f) =>
									f.fileName === defaultImage,
							) || null,
						);
						setCurrentImage(defaultImage);
						setCustom(null);
					}
				}
			}
		})();
	}, [authed.loaded, authed.seed]);

	return (
		<ModalLayout
			showHeader
			title="Change picture"
			{...props}
			name={name}
		>
			<ModalChangePictureStyle>
				<div className="content">
					{images.map((m, i) => (
						<div
							key={i}
							className={classes(
								'image-box',
								selected?.fileName === m.fileName
									? 'selected'
									: '',
							)}
							onClick={() => changePicture(m)}
						>
							<div
								className="image"
								style={{
									backgroundImage: `url(/img/pictures/${m.fileName})`,
								}}
							/>
						</div>
					))}
					<div
						className={classes(
							'image-box',
							'image-box-custom',
							custom && !loadingMe && !selected
								? 'selected'
								: '',
						)}
						onClick={() => uploadCustom()}
					>
						<div className="choose-image">
							<PhotoCameraIcon />
							<span>Upload</span>
						</div>
						{custom ? (
							<div
								className="image"
								style={{
									backgroundImage: `url(${custom})`,
								}}
							/>
						) : null}
					</div>
				</div>
				<div className="modal-footer">
					<Button
						disabled={
							loadingMe ||
							selected?.fileName ===
								currentImage ||
							!selected
						}
						onClick={handleSave}
					>
						Save
					</Button>
				</div>
			</ModalChangePictureStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalChangePicture {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		//
	}

	export interface IImage {
		name: string;
		fileName: string;
	}
}

const ModalChangePictureStyle = styled.div`
	max-width: 500px;
	> h2 {
		color: ${({ theme }) =>
			theme?.palette?.primary?.main};
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		row-gap: 10px;
		column-gap: 10px;
		.image-box {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			position: relative;
			border: 3px solid transparent;
			border-radius: 50%;
			width: 62px;
			height: 62px;
			box-sizing: border-box;
			.choose-image {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 12px;
				width: 100%;
				height: 100%;
			}
			&.selected {
				border-color: ${({ theme }) =>
					theme?.palette?.primary?.light};
			}
			.image {
				width: 100%;
				height: 100%;
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 50%;
			}
		}
		.image-box-custom {
			position: relative;
			.choose-image {
				position: absolute;
				top: 0;
				left: 0;

				&.selected {
					opacity: 0;
					&:hover {
						opacity: 0.5;
					}
				}
			}
		}
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
	}
`;
