import styled from 'styled-components';
import React from 'react';
import {
	useNavigate,
	useParams,
} from 'react-router-dom';
import useAxios from 'axios-hooks';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { Skeleton } from '@mui/material';
import { useAuth } from '../../components/contexts/auth';
import { API_ROUTES, ROUTES } from '../../routes';
import { CSSMediaSize } from '../../const';
import { Auth } from '../../utils/auth';
import { getUniqueId } from '../../scripts/unique-id-manager';
import { changeModals } from '../../components/modals/modals';
import buildApiRoute from '../../utils/build-api-route';

const User = () => {
	const navigate = useNavigate();
	const authed = useAuth();
	const params = useParams();

	const otherId = params.id;

	const [
		{ data: userDataMe, loading: loadingMe },
		getMe,
	] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.getMe,
		},
		{ manual: true, autoCancel: true },
	);
	const [
		{ data: userData, loading: loadingUser },
		getUser,
	] = useAxios(
		{
			method: 'GET',
		},
		{ manual: true, autoCancel: true },
	);
	const user =
		userDataMe?.data?.user ||
		userData?.data?.user;

	const onChangePicture = () => {
		window.dispatchEvent(
			changeModals({
				ModalChangePicture: {
					open: true,
					showHeader: true,
					title: 'Change picture',
				},
			}),
		);
	};

	const onChangeBanner = () => {
		window.dispatchEvent(
			changeModals({
				ModalChangeBanner: {
					open: true,
					showHeader: true,
					title: 'Change banner',
				},
			}),
		);
	};

	React.useEffect(() => {
		if (!otherId) {
			if (authed.loaded) {
				if (!authed.authed) {
					navigate(ROUTES.login);
				} else {
					getMe({
						headers: {
							Authorization: `Bearer ${Auth.getToken()}`,
							uniqueId: getUniqueId(),
						},
					});
				}
			}
		} else {
			getUser({
				url: buildApiRoute(API_ROUTES.getUser, {
					id: otherId,
				}),
			});
		}
	}, [authed.loaded, authed.seed, otherId]);

	return (
		<UserStyle>
			<div className="banner-container">
				<div className="banner-box">
					{loadingMe || loadingUser ? (
						<Skeleton
							variant="rectangular"
							width="100%"
							height="400px"
						/>
					) : (
						<div
							className="banner"
							style={{
								backgroundImage: `url('/img/banners/${
									user?.banner || 'astolfo-1.png'
								}')`,
							}}
						/>
					)}
					{!otherId && !loadingMe ? (
						<div
							className="editable-overlay"
							onClick={onChangeBanner}
						>
							<PhotoCameraIcon />
							<span>Change</span>
						</div>
					) : null}
				</div>
				<div className="banner-content-box">
					<div className="profile-box">
						{loadingMe || loadingUser ? (
							<Skeleton
								variant="circular"
								width="128px"
								height="128px"
								style={{
									border: '5px solid var(--c-p1)',
								}}
							/>
						) : (
							<div
								className="profile-picture"
								style={{
									backgroundImage: `url('/img/pictures/${
										user?.picture || '1.png'
									}')`,
								}}
							/>
						)}
						{!otherId && !loadingMe ? (
							<div
								className="editable-overlay"
								onClick={onChangePicture}
							>
								<PhotoCameraIcon />
								<span>Change</span>
							</div>
						) : null}
					</div>
					<div className="profile-name-box">
						<div className="profile-name-box-inner">
							<div className="profile-name">
								<span>
									{user?.username || '-'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</UserStyle>
	);
};

export default User;

export namespace NUser {
	//
}

const UserStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	/*padding: 20px 50px;*/
	display: flex;

	.banner-container {
		flex-grow: 1;
		.banner-box {
			position: relative;
			.banner {
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				width: 100%;
				height: 400px;
			}

			.editable-overlay {
				cursor: pointer;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: var(--c-p1-aa);
				transition: opacity 0.2s;
				opacity: 0;
				&:hover {
					opacity: 1;
				}
				> svg {
					width: 48px;
					height: 48px;
				}
			}
		}
		.banner-content-box {
			transform: translateY(-50%);
			padding: 0 50px;
			display: flex;
			pointer-events: none;
			> * {
				pointer-events: all;
			}
			.profile-box {
				position: relative;
				.profile-picture {
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
					width: 128px;
					height: 128px;
					border-radius: 50%;
					border: 5px solid var(--c-p1);
				}
				.editable-overlay {
					--margin: 5px;
					cursor: pointer;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-radius: 50%;
					position: absolute;
					top: 0;
					left: 0;
					width: calc(100% - var(--margin) * 2);
					height: calc(100% - var(--margin) * 2);
					margin: var(--margin);
					background-color: var(--c-p1-aa);
					transition: opacity 0.2s;
					opacity: 0;
					&:hover {
						opacity: 1;
					}
					> svg {
						width: 32px;
						height: 32px;
					}
				}
			}
			.profile-name-box-inner {
				--pad-top: 10px;
				height: calc(50% - var(--pad-top));
				transform: translateY(100%);
				padding-top: var(--pad-top);
				padding-left: 10px;
			}
			.profile-name-box {
				.profile-name {
					font-weight: 600;
					font-size: 24px;
				}
			}
		}
	}

	${CSSMediaSize.phone} {
		.banner-container {
			.banner-content-box {
				padding: 0 10px;
			}
		}
	}
`;
