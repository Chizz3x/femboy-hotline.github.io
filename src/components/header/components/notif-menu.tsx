import { Inbox as InboxIcon } from '@mui/icons-material';
import {
	Badge,
	IconButton,
	Menu,
	useMediaQuery,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import useAxios from 'axios-hooks';
import {
	useLocation,
	useNavigate,
} from 'react-router-dom';
import NotifItem from './notif-item';
import {
	API_ROUTES,
	ROUTES,
} from '../../../routes';
import { Auth } from '../../../utils/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { CSSMediaSize } from '../../../const';
import {
	useDispatch,
	useSelector,
} from '../../../store/store';
import { fetchNotifications } from '../../../store/slices/notifs';

const NotifMenu = (props: NNotifMenu.IProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useDispatch();

	const { notifs, totalUnread } = useSelector(
		(st) => st.notifications,
	);

	const isMobile = useMediaQuery(
		CSSMediaSize.phone,
	);

	const [notifsMenuAnchor, setNotifsMenuAnchor] =
		React.useState<null | HTMLElement>(null);

	const toggleNotifsMenu = (
		event?: React.MouseEvent<HTMLElement>,
	) => {
		setNotifsMenuAnchor((state) =>
			state ? null : event?.currentTarget || null,
		);
	};

	const closeNotifsMenu = () => {
		setNotifsMenuAnchor(null);
	};

	const [, readAll] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.readAllNotifs,
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
		},
		{
			manual: true,
			autoCancel: true,
		},
	);

	const readAllNotifs = async () => {
		await readAll();
		dispatch(fetchNotifications());
	};

	React.useEffect(() => {
		closeNotifsMenu();
	}, [location]);

	return (
		<>
			<IconButton
				size="large"
				id="mobile-notifs"
				onClick={toggleNotifsMenu}
			>
				<Badge
					overlap="circular"
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					badgeContent={totalUnread}
					max={99}
					color="primary"
				>
					<InboxIcon />
				</Badge>
			</IconButton>
			<NotifsMenuStyle
				disablePortal
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom',
				}}
				transformOrigin={{
					horizontal: isMobile ? 'left' : 'right',
					vertical: 'top',
				}}
				MenuListProps={{
					'aria-labelledby': 'mobile-notifs',
				}}
				open={!!notifsMenuAnchor}
				anchorEl={notifsMenuAnchor}
				onClose={() => toggleNotifsMenu()}
			>
				<div className="notifs-header">
					<div className="notifs-header-left">
						{totalUnread} unread
					</div>
					<div className="notifs-header-right">
						<span onClick={readAllNotifs}>
							Mark all as read
						</span>
					</div>
				</div>
				{notifs?.map((notif: any, i: number) => (
					<NotifItem
						notif={notif}
						key={i}
						closeMenu={closeNotifsMenu}
					/>
				))}
				<div className="notifs-footer">
					<span
						onClick={() =>
							navigate(ROUTES.notifs)
						}
					>
						View all notifications
					</span>
				</div>
			</NotifsMenuStyle>
		</>
	);
};

export default NotifMenu;

export namespace NNotifMenu {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps {
		//
	}
}

const NotifsMenuStyle = styled(Menu)`
	.MuiPaper-root {
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		background-image: none;
		min-width: 250px;
		max-width: 400px;
		max-height: 300px;
		.MuiList-root {
			padding: 0;
		}
	}
	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) =>
			theme?.palette?.primary?.main};
	}
	.notifs-header {
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		position: sticky;
		top: 0;
		z-index: 1;
		display: flex;
		justify-content: space-between;
		padding: 0 16px;
		padding-bottom: 14px;
		padding-top: 14px;
		font-size: 13px;
		.notifs-header-left {
			color: ${({ theme }) =>
				theme?.palette?.text?.secondary};
		}
		.notifs-header-right {
			display: flex;
			justify-content: flex-end;
			> span {
				cursor: pointer;
				text-decoration: underline;
				&:hover {
					color: ${({ theme }) =>
						theme?.palette?.primary?.main};
				}
			}
		}
	}
	.notifs-footer {
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		padding: 14px 16px;
		display: flex;
		justify-content: center;
		position: sticky;
		bottom: 0;
		> span {
			cursor: pointer;
			text-decoration: underline;
			&:hover {
				color: ${({ theme }) =>
					theme?.palette?.primary?.main};
			}
		}
	}
`;
