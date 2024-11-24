import styled from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';
import { useAuth } from '../../components/contexts/auth';
import { API_ROUTES, ROUTES } from '../../routes';
import { CSSMediaSize } from '../../const';
import { Auth } from '../../utils/auth';
import { getUniqueId } from '../../scripts/unique-id-manager';

const User = () => {
	const navigate = useNavigate();
	const authed = useAuth();

	const [
		{ data: userData, loading: userLoading },
	] = useAxios({
		method: 'POST',
		url: API_ROUTES.getMe,
		headers: {
			Authorization: `Bearer ${Auth.getToken()}`,
		},
		data: {
			uniqueId: getUniqueId(),
		},
	});
	const user = userData?.data?.user;

	React.useEffect(() => {
		if (authed.loaded) {
			if (!authed.authed) {
				navigate(ROUTES.login);
			}
		}
	}, [authed.loaded]);

	return (
		<UserStyle>
			<div className="banner-container">
				<div className="banner-box">
					<div
						className="banner"
						style={{
							backgroundImage: `url('/img/banners/${
								user?.banner || 'astolfo-1.png'
							}')`,
						}}
					/>
				</div>
				<div className="banner-content-box">
					<div className="profile-box">
						<div
							className="profile-picture"
							style={{
								backgroundImage: `url('/img/pictures/${
									user?.picture || '1.png'
								}')`,
							}}
						/>
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
			.banner {
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center;
				width: 100%;
				height: 400px;
			}
		}
		.banner-content-box {
			transform: translateY(-50%);
			padding: 0 50px;
			display: flex;
			.profile-box {
				.profile-picture {
					background-repeat: no-repeat;
					background-size: cover;
					background-position: center;
					width: 128px;
					height: 128px;
					border-radius: 50%;
					border: 5px solid var(--c-p1);
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
