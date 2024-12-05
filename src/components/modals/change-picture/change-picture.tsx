import React from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import classes from '../../../utils/classes';
import { API_ROUTES } from '../../../routes';
import { useAuth } from '../../contexts/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { Auth } from '../../../utils/auth';

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

	const [{ loading }, getMe] = useAxios(
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

	const handleSave = async () => {
		const res = await userChangePicture({
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
			},
			data: {
				uniqueId: getUniqueId(),
				picture: selected?.fileName,
			},
		});
		if (
			res?.data?.statusCode === StatusCodes.OK
		) {
			window.dispatchEvent(
				changeModals({ [name]: null }),
			);
			window.dispatchEvent(
				new CustomEvent('checkAuth'),
			);
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
						},
						data: {
							uniqueId: getUniqueId(),
						},
					});
					setSelected(
						images.find(
							(f) =>
								f.fileName ===
								(res?.data?.data?.user?.picture ||
									defaultImage),
						) || null,
					);
					setCurrentImage(
						res?.data?.data?.user?.picture ||
							defaultImage,
					);
				}
			}
		})();
	}, [authed.loaded]);

	return (
		<ModalLayout {...props} name={name}>
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
				</div>
				<div className="modal-footer">
					<Button
						disabled={
							loading ||
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
		color: var(--c-pink1);
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		row-gap: 10px;
		column-gap: 10px;
		.image-box {
			cursor: pointer;
			position: relative;
			border: 3px solid transparent;
			border-radius: 50%;
			&.selected {
				border-color: var(--c-pink2);
			}
			.image {
				width: 56px;
				height: 56px;
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 50%;
			}
		}
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
	}
`;
