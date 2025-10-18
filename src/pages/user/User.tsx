import styled from 'styled-components';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { PhotoCamera as PhotoCameraIcon } from '@mui/icons-material';
import { Skeleton, Tooltip } from '@mui/material';
import { API_ROUTES } from '../../routes';
import {
	CSSMediaSize,
	USER_ROLE,
} from '../../const';
import { Auth } from '../../utils/auth';
import { getUniqueId } from '../../scripts/unique-id-manager';
import { changeModals } from '../../components/modals/modals';
import buildApiRoute from '../../utils/build-api-route';
import UserInfo from './components/user-info';
import getUserPicture from '../../utils/get-user-picture';
import IconDiscord from '../../components/icons/icon-discord';
import ModControls from './components/mod-controls';
import { CopyButton } from '../../components/copy-button';
import IconFemboyhotline from '../../components/icons/icon-femboyhotline';
import UserPosts from './components/user-posts';
import UserComments from './components/user-comments';
import { UserCard } from '../../components/user-card';
import { useSelector } from '../../store/store';

const User = () => {
	const params = useParams();

	const otherId = params.id;

	const { user: userMe, loading: loadingMe } =
		useSelector((st) => st.user);

	const canBan = [
		USER_ROLE.ADMIN,
		USER_ROLE.OWNER,
	].includes(userMe?.role || 0);

	const [
		{ data: userData, loading: loadingUser },
		getUser,
	] = useAxios(
		{
			method: 'GET',
		},
		{ manual: true, autoCancel: true },
	);
	const userViewed =
		!otherId ||
		userMe?.username === otherId ||
		userMe?._id === otherId
			? userMe
			: userData?.data?.user;

	const isMe = userMe?._id === userViewed?._id;

	const onChangePicture = () => {
		window.dispatchEvent(
			changeModals({
				ModalChangePicture: {
					open: true,
				},
			}),
		);
	};

	const onChangeBanner = () => {
		window.dispatchEvent(
			changeModals({
				ModalChangeBanner: {
					open: true,
				},
			}),
		);
	};

	React.useEffect(() => {
		if (otherId) {
			getUser({
				url: buildApiRoute(API_ROUTES.getUser, {
					id: otherId,
				}),
			});
		}
	}, [otherId]);

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
									userViewed?.banner ||
									'astolfo-1.png'
								}')`,
							}}
						/>
					)}
					{isMe ? (
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
							/>
						) : (
							<div
								className="profile-picture"
								style={{
									backgroundImage: `url('${getUserPicture(
										userViewed,
									)}')`,
								}}
							/>
						)}
						{isMe ? (
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
								<UserCard
									RenderElement={
										<UsernameTextStyle>
											{userViewed?.username ||
												'-'}
										</UsernameTextStyle>
									}
									props={{
										user: userViewed,
									}}
								/>
								{userViewed?.role ===
								USER_ROLE.OWNER ? (
									<Tooltip
										placement="top"
										arrow
										title="Owner"
									>
										<span>
											<IconFemboyhotline />
										</span>
									</Tooltip>
								) : null}
								{userViewed?.discord ? (
									<span className="user-discord">
										<IconDiscord />
										{
											userViewed?.discord
												?.username
										}
										<CopyButton
											data={
												userViewed?.discord
													?.username
											}
										/>
									</span>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
			{canBan ? (
				<div className="mod-controls">
					<ModControls user={userViewed} />
				</div>
			) : null}
			<div className="user-content">
				<UserInfo user={userViewed} isMe={isMe} />
			</div>
			<div className="user-social-activity">
				<UserPosts
					user={userViewed}
					isMe={isMe}
				/>
				<UserComments
					user={userViewed}
					isMe={isMe}
				/>
			</div>
		</UserStyle>
	);
};

export default User;

export namespace NUser {
	//
}

const UsernameTextStyle = styled.span`
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;

const UserStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	flex-direction: column;
	display: flex;

	.banner-container {
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
				background-color: ${({ theme }) =>
					theme?.palette?.background?.default}aa;
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
					border: 5px solid
						${({ theme }) =>
							theme?.palette?.background
								?.default};
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
					background-color: ${({ theme }) =>
						theme?.palette?.background
							?.default}aa;
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
					> *:not(:last-child) {
						margin-right: 10px;
					}
					.user-discord {
						font-size: 14px;
						display: inline-flex;
						align-items: center;
						column-gap: 5px;
						color: ${({ theme }) =>
							theme?.palette?.text?.secondary};
					}
				}
			}
		}
	}

	.user-social-activity {
		display: flex;
		justify-content: space-evenly;
		column-gap: 10px;
	}

	.user-content,
	.mod-controls,
	.user-social-activity {
		padding: 10px 20px;
	}

	${CSSMediaSize.phone} {
		.banner-container {
			.banner-content-box {
				padding: 0 10px;
				flex-direction: column;
				align-items: center;
				text-align: center;
				.profile-name-box-inner {
					transform: none;
				}
			}
		}
		.user-social-activity {
			flex-direction: column;
			row-gap: 12px;
			> * {
				box-sizing: border-box;
			}
		}
		.user-content,
		.mod-controls,
		.user-social-activity {
			padding: 10px 10px;
		}
	}
`;
