import React from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import { Button } from '@mui/material';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import classes from '../../../utils/classes';
import { API_ROUTES } from '../../../routes';
import { useAuth } from '../../contexts/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { Auth } from '../../../utils/auth';

const defaultImage = 'astolfo-1.png';
const images: NModalChangeBanner.IImage[] = [
	{
		name: 'Simple Astolfo',
		fileName: 'astolfo-1.png',
	},
	{
		name: 'Horny',
		fileName: 'horny.png',
	},
];

const name = 'ModalChangeBanner';
const Modal = (
	props: NModalChangeBanner.IProps,
) => {
	const authed = useAuth();

	const [selected, setSelected] =
		React.useState<NModalChangeBanner.IImage | null>(
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
	const [, userChangeBanner] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.changeBanner,
		},
		{ manual: true, autoCancel: true },
	);

	const changeBanner = (
		image: NModalChangeBanner.IImage,
	) => {
		setSelected(image);
	};

	const handleSave = async () => {
		const res = await userChangeBanner({
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
			},
			data: {
				uniqueId: getUniqueId(),
				banner: selected?.fileName,
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
			toast('Banner changed', {
				type: 'success',
			});
		} else {
			toast('Failed to change banner', {
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
								(res?.data?.data?.user?.banner ||
									defaultImage),
						) || null,
					);
					setCurrentImage(
						res?.data?.data?.user?.banner ||
							defaultImage,
					);
				}
			}
		})();
	}, [authed.loaded]);

	return (
		<ModalLayout {...props} name={name}>
			<ModalChangeBannerStyle>
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
							onClick={() => changeBanner(m)}
						>
							<div
								className="image"
								style={{
									backgroundImage: `url(/img/banners/${m.fileName})`,
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
			</ModalChangeBannerStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalChangeBanner {
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

const ModalChangeBannerStyle = styled.div`
	max-width: 500px;
	width: 300px;
	> h2 {
		color: var(--c-pink1);
	}
	.content {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		row-gap: 10px;
		column-gap: 10px;
		.image-box {
			flex-grow: 1;
			cursor: pointer;
			position: relative;
			border: 3px solid transparent;
			border-radius: 3px;
			&.selected {
				border-color: var(--c-pink2);
			}
			.image {
				width: 100%;
				height: 76px;
				background-position: center;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 3px;
			}
		}
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		margin-top: 15px;
	}
`;
