import {
	Avatar,
	Popover,
	PopoverProps,
	Tooltip,
} from '@mui/material';
import React, { cloneElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import buildRoute from '../../utils/build-route';
import { ROUTES } from '../../routes';
import IconDiscord from '../icons/icon-discord';
import { CopyButton } from '../copy-button';
import { USER_ROLE } from '../../const';
import IconFemboyhotline from '../icons/icon-femboyhotline';
import getUserPicture from '../../utils/get-user-picture';

const UserCard = (props: NUserCard.IProps) => {
	const {
		props: innerProps = {},
		RenderComponent,
		RenderElement,
		...rest
	} = props;
	const { user, stopPropagation = false } =
		innerProps;

	const [userCardAnchorEl, setUserCardAnchorEl] =
		React.useState<null | HTMLElement>(null);
	const popoverRef = React.useRef<any>(null);

	const handleOpenUserCard = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		if (stopPropagation) event?.stopPropagation();
		setUserCardAnchorEl(event.currentTarget);
	};
	const handleCloseUserCard = () =>
		setUserCardAnchorEl(null);

	const userCardOpen = Boolean(userCardAnchorEl);

	React.useEffect(() => {
		const handleResize = () => {
			if (popoverRef.current) {
				popoverRef.current.updatePosition?.();
			}
		};

		window.addEventListener(
			'resize',
			handleResize,
		);
		return () =>
			window.removeEventListener(
				'resize',
				handleResize,
			);
	}, []);

	return (
		<>
			{RenderComponent ? (
				<RenderComponent
					onClick={handleOpenUserCard}
					key={`user-card-component-${rest.key}`}
				/>
			) : RenderElement ? (
				cloneElement(RenderElement, {
					onClick: handleOpenUserCard,
					key: `user-card-element-${rest.key}`,
				})
			) : null}
			<UserCardStyle
				ref={popoverRef}
				open={userCardOpen}
				anchorEl={userCardAnchorEl}
				onClose={handleCloseUserCard}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				{...rest}
				key={`user-card-popover-${rest.key}`}
			>
				<div className="top-content">
					<div className="user-avatar">
						<Avatar
							alt="user-avatar"
							src={getUserPicture(user)}
							sx={{ width: 56, height: 56 }}
						/>
					</div>
					<div className="username">
						<Link
							to={buildRoute(ROUTES.userId, {
								id: user?._id,
							})}
						>
							<h3>{user?.username}</h3>
						</Link>
						{user?.role === USER_ROLE.OWNER ? (
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
					</div>
				</div>
				<div className="middle-content">
					{user?.discord ? (
						<div className="middle-content-tab">
							<h4>Connections</h4>
							{user?.discord ? (
								<div className="connection-row">
									<IconDiscord />{' '}
									<span>
										{user?.discord?.username}
									</span>
									<CopyButton
										data={user?.discord?.username}
									/>
								</div>
							) : null}
						</div>
					) : null}
				</div>
				<div className="bottom-content">
					<div className="joined-date">
						<span>
							Joined at{' '}
							<span>
								{dayjs(user?.created_at).format(
									'YYYY-MM-DD',
								)}
							</span>
						</span>
					</div>
				</div>
			</UserCardStyle>
		</>
	);
};

export { UserCard };

export namespace NUserCard {
	export interface IProps
		extends Partial<PopoverProps> {
		RenderComponent?: (
			...args: any[]
		) => JSX.Element;
		RenderElement?: React.ReactElement;
		props?: {
			user?: any;
			stopPropagation?: boolean;
		};
	}
}

const UserCardStyle = styled(Popover)`
	.MuiPopover-paper {
		border-radius: 10px;
		margin: 5px;
		max-width: 250px;
		width: 100%;
		display: flex;
		flex-direction: column;
		.top-content {
			display: flex;
			flex-direction: column;
			row-gap: 6px;
			padding: 4px 12px;
			padding-top: 12px;
			.username {
				display: flex;
				column-gap: 8px;
				align-items: center;
			}
		}
		.middle-content {
			padding: 4px 12px;
			.middle-content-tab {
				.connection-row {
					display: flex;
					column-gap: 5px;
				}
			}
		}
		.bottom-content {
			padding: 8px 12px;
			padding-bottom: 12px;
			background-color: ${({ theme }) =>
				theme?.palette?.background?.default};
			.joined-date {
				> span {
					font-size: 12px;
					font-weight: 600;
					color: ${({ theme }) =>
						theme?.palette?.text?.secondary};
					> span {
						font-weight: 400;
					}
				}
			}
		}
	}
`;
