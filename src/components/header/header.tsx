import React from 'react';
import { toast } from 'react-toastify';
import styled, {
	useTheme,
} from 'styled-components';
import {
	Link,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import {
	IconButton,
	MenuItem,
	Menu,
	Button,
	Badge,
	Avatar,
	Skeleton,
} from '@mui/material';
import {
	CardGiftcard as CardGiftcardIcon,
	Contacts as ContactsIcon,
	Home as HomeIcon,
	Info as InfoIcon,
	Menu as MenuIcon,
	AutoStories as AutoStoriesIcon,
	PersonAdd as PersonAddIcon,
	Login as LoginIcon,
	Logout as LogoutIcon,
	Person as PersonIcon,
	DragHandle as DragHandleIcon,
	Forum as ForumIcon,
} from '@mui/icons-material';
import axios from 'axios';
import useAxios from 'axios-hooks';
import {
	CSSMediaSize,
	PHONE_NUMBER,
} from '../../const';
import { API_ROUTES, ROUTES } from '../../routes';
import { useAuth } from '../contexts/auth';
import { Auth } from '../../utils/auth';
import { getUniqueId } from '../../scripts/unique-id-manager';
import {
	localStorageRemove,
	localStorageSet,
} from '../../utils/local-storage';
import useWatchStorage from '../../utils/hooks/use-watch-storage';
import getUserPicture from '../../utils/get-user-picture';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const theme = useTheme();

	const [currentRoute, setCurrentRoute] =
		React.useState('');
	const [mobileMenuAnchor, setMobileMenuAnchor] =
		React.useState<null | HTMLElement>(null);

	const { authed, seed: authedSeed } = useAuth();

	const linkExclusions = authed
		? ['goRegister', 'goLogin']
		: ['doLogout'];

	const getLinks = (exclude: string[] = []) => {
		return [
			{
				id: 'goHome',
				name: 'Home',
				route: ROUTES.home,
				icon: <HomeIcon />,
			},
			{
				id: 'goForum',
				name: 'Forum',
				route: ROUTES.forum,
				icon: <ForumIcon />,
			},
			{
				id: 'goAbout',
				name: 'About',
				route: ROUTES.about,
				icon: <InfoIcon />,
			},
			{
				id: 'goContact',
				name: 'Contact',
				route: ROUTES.contact,
				icon: <ContactsIcon />,
			},
			{
				id: 'goDonate',
				name: 'Donate',
				route: ROUTES.donate,
				icon: <CardGiftcardIcon />,
			},
		].filter(
			(f) =>
				f.route && !exclude.includes(f.route),
		) as NHeader.ILink[];
	};

	const getMoreLinks = (
		exclude: string[] = [],
	) => {
		return [
			{
				id: 'goProfile',
				name: 'Profile',
				route: ROUTES.user,
				icon: <PersonIcon />,
			},
			{
				id: 'goCrashCourse',
				name: 'Crash course',
				route: ROUTES.crashCourse,
				icon: <AutoStoriesIcon />,
			},
			{
				id: 'goRegister',
				name: 'Register',
				route: ROUTES.register,
				icon: <PersonAddIcon />,
			},
			{
				id: 'goLogin',
				name: 'Login',
				route: ROUTES.login,
				icon: <LoginIcon />,
			},
			{
				id: 'doLogout',
				name: 'Logout',
				icon: <LogoutIcon />,
				fn: async () => {
					if (typeof window !== 'undefined') {
						await axios.post(
							API_ROUTES.logout,
							undefined,
							{
								headers: {
									Authorization: `Bearer ${Auth.getToken()}`,
								},
							},
						);

						Auth.deleteAuth();

						navigate(ROUTES.home);
					}
				},
			},
		].filter(
			(f) => f.id && !exclude.includes(f.id),
		) as NHeader.ILink[];
	};

	const moreLinks = getMoreLinks(linkExclusions);
	const links = getLinks(linkExclusions);

	const [
		{ data: userData, loading: userDataLoading },
		getMe,
	] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.getMe,
		},
		{ manual: true, autoCancel: true },
	);
	const user = userData?.data?.user;

	const toggleMobileMenu = (
		event?: React.MouseEvent<HTMLElement>,
	) => {
		if (userDataLoading) return;
		setMobileMenuAnchor((state) =>
			state ? null : event?.currentTarget || null,
		);
	};

	const { data: repPinnedData } = useWatchStorage(
		{
			keys: ['rep-pinned'],
			type: 'local',
			withData: true,
		},
	);

	const toggleRepPin = () => {
		const pinned =
			localStorage.getItem('rep-pinned');
		if (pinned) {
			localStorageRemove('rep-pinned');
		} else {
			localStorageSet('rep-pinned', 'true');
		}
	};

	React.useEffect(() => {
		if (location.pathname) {
			setCurrentRoute(location.pathname);
		}
	}, [location.pathname]);

	React.useEffect(() => {
		if (authed) {
			getMe({
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					uniqueId: getUniqueId(),
				},
				data: {
					withPoints: true,
					withRP: true,
				},
			});
		}
	}, [authed, authedSeed]);

	return (
		<HeaderStyle id="root-header">
			{/* {authed && userData ? (
				<div
					className={classes(
						'rep-data',
						repPinnedData['rep-pinned'] === 'true'
							? 'rep-pinned'
							: '',
					)}
				>
					<div className="rep-data-handle">
						<DragHandleIcon
							onClick={toggleRepPin}
						/>
					</div>
					<table className="rep-data-table">
						<tbody>
							<tr>
								<td>RP</td>
								<td>{user?.rp || 0}</td>
							</tr>
							<tr>
								<td>FP</td>
								<td>{user?.points || 0}</td>
							</tr>
						</tbody>
					</table>
				</div>
			) : null} */}
			<div className="container container-left">
				<Link to={ROUTES.home}>
					<div className="container-parts">
						<img
							alt="favicon"
							className="icon"
							src="/favicon.png"
						/>
						<div className="tab tab-main">
							<i>Femboy Hotline</i>
						</div>
					</div>
				</Link>
				<div className="container-parts menu-info">
					<span className="call-text">
						<span>Call us today!</span>
						{/* <span
							className="fake-link"
							onClick={() =>
								toast('It aint real...', {
									type: 'info',
								})
							}
						>
							{PHONE_NUMBER}
						</span> */}
						<a
							className="fake-link"
							href={`tel:${PHONE_NUMBER}`}
						>
							{PHONE_NUMBER}
						</a>
					</span>
					<div className="mobile-menu">
						<IconButton
							id="mobile-menu"
							onClick={toggleMobileMenu}
						>
							{authed &&
							(user || userDataLoading) ? (
								<Badge
									overlap="circular"
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									badgeContent={
										<MenuIcon
											className="menu-icon-on-avatar"
											sx={{
												fill: theme?.palette?.text
													?.primary,
												padding: '3px',
												height: '18px',
												width: '18px',
											}}
										/>
									}
								>
									{userDataLoading ? (
										<Skeleton
											variant="circular"
											width={40}
											height={40}
										/>
									) : (
										<Avatar
											alt={user.username}
											src={`/img/pictures/${
												user.picture || '1.png'
											}`}
										/>
									)}
								</Badge>
							) : (
								<MenuIcon
									sx={{
										fill: theme?.palette?.text
											?.primary,
									}}
								/>
							)}
						</IconButton>
						<MobileMenuStyle
							disablePortal
							anchorOrigin={{
								horizontal: 'right',
								vertical: 'bottom',
							}}
							transformOrigin={{
								horizontal: 'right',
								vertical: 'top',
							}}
							MenuListProps={{
								'aria-labelledby': 'mobile-menu',
							}}
							anchorEl={mobileMenuAnchor}
							open={!!mobileMenuAnchor}
							onClose={() => toggleMobileMenu()}
							// PaperProps={{
							//  style: {
							//    maxHeight: ITEM_HEIGHT * 4.5,
							//    width: "20ch",
							//  },
							// }}
						>
							{[...links, ...moreLinks].map(
								(link) =>
									link.route || link.fn ? (
										<MenuItem
											className="menu-item"
											key={link.id}
											onClick={() =>
												toggleMobileMenu()
											}
										>
											<Button
												endIcon={link.icon}
												disableRipple
												className={[
													'header-mobile-btn',
													currentRoute ===
													link.route
														? 'active'
														: '',
												].join(' ')}
												onClick={
													link.fn ||
													(() => {
														navigate(
															link.route ||
																ROUTES.home,
														);
													})
												}
											>
												{link.name}
											</Button>
										</MenuItem>
									) : null,
							)}
						</MobileMenuStyle>
					</div>
				</div>
			</div>
			<div className="container container-right">
				<div className="container-parts">
					{links.map((link) =>
						link.route || link.fn ? (
							link.route ? (
								<Link
									key={link.id}
									to={link.route}
								>
									<Button
										startIcon={link.icon}
										disableRipple
										className={[
											'header-btn',
											currentRoute === link.route
												? 'active'
												: '',
										].join(' ')}
									>
										{link.name}
									</Button>
								</Link>
							) : (
								<Button
									startIcon={link.icon}
									disableRipple
									className={[
										'header-btn',
										currentRoute === link.route
											? 'active'
											: '',
									].join(' ')}
									onClick={link.fn}
								>
									{link.name}
								</Button>
							)
						) : null,
					)}
					<div className="burger-menu">
						<IconButton
							id="burger-menu"
							onClick={toggleMobileMenu}
						>
							{authed &&
							(user || userDataLoading) ? (
								<Badge
									overlap="circular"
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									badgeContent={
										<MenuIcon
											className="menu-icon-on-avatar"
											sx={{
												fill: theme?.palette?.text
													?.primary,
												padding: '3px',
												height: '18px',
												width: '18px',
											}}
										/>
									}
								>
									{userDataLoading ? (
										<Skeleton
											variant="circular"
											width={40}
											height={40}
										/>
									) : (
										<Avatar
											alt={user.username}
											src={getUserPicture(user)}
										/>
									)}
								</Badge>
							) : (
								<MenuIcon
									sx={{
										fill: theme?.palette?.text
											?.primary,
									}}
								/>
							)}
						</IconButton>
						<MobileMenuStyle
							disablePortal
							anchorOrigin={{
								horizontal: 'right',
								vertical: 'bottom',
							}}
							transformOrigin={{
								horizontal: 'right',
								vertical: 'top',
							}}
							MenuListProps={{
								'aria-labelledby': 'burger-menu',
							}}
							anchorEl={mobileMenuAnchor}
							open={!!mobileMenuAnchor}
							onClose={() => toggleMobileMenu()}
						>
							{moreLinks.map((link) =>
								link.route || link.fn ? (
									<MenuItem
										className="menu-item"
										key={link.id}
										onClick={() =>
											toggleMobileMenu()
										}
									>
										<Button
											endIcon={link.icon}
											disableRipple
											className={[
												'header-mobile-btn',
												currentRoute ===
												link.route
													? 'active'
													: '',
											].join(' ')}
											onClick={
												link.fn ||
												(() => {
													navigate(
														link.route ||
															ROUTES.home,
													);
												})
											}
										>
											{link.name}
										</Button>
									</MenuItem>
								) : null,
							)}
						</MobileMenuStyle>
					</div>
				</div>
			</div>
		</HeaderStyle>
	);
};

export { Header };

export namespace NHeader {
	export interface ILink {
		id: string;
		name: string;
		route?: string;
		icon?: JSX.Element;
		fn?: () => any;
	}
}

const MobileMenuStyle = styled(Menu)`
	.MuiPaper-root {
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		min-width: 100px;
		max-height: 300px;
		> ul {
			> li {
				justify-content: flex-end;
			}
		}
	}
	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) =>
			theme?.palette?.primary?.main};
	}
`;

const HeaderStyle = styled.div`
	max-width: 100%;
	box-shadow: 0 0 5px var(--c-p);
	background-color: ${({ theme }) =>
		theme?.palette?.background?.default};
	border-top: 4px solid
		${({ theme }) =>
			theme?.palette?.primary?.dark};
	position: sticky;
	min-height: auto;
	top: 0;
	z-index: 999;
	display: flex;
	flex-direction: row;
	padding: 10px 20px;

	.rep-data {
		border-radius: 0 0 0 10px;
		position: absolute;
		right: 0;
		top: 100%;
		min-width: 50px;
		min-height: 20px;
		background-color: ${({ theme }) =>
			theme?.palette?.background?.default};
		padding: 5px 10px;
		padding-left: 0;
		font-size: 12px;
		display: flex;
		transform: translateX(calc(100% - 24px));
		transition: transform 0.1s ease-in-out;

		&:hover,
		&.rep-pinned {
			transform: translateX(0);
		}

		&.rep-pinned {
			.rep-data-handle {
				color: ${({ theme }) =>
					theme?.palette?.primary?.main};
			}
		}

		.rep-data-handle {
			display: flex;
			align-items: center;
			cursor: pointer;
			:hover {
				color: ${({ theme }) =>
					theme?.palette?.primary?.dark};
			}
			> * {
				transform: rotate(90deg);
			}
		}

		.rep-data-table {
			tr {
				> td:first-child {
					font-weight: 700;
					padding-right: 5px;
				}
			}
		}
	}

	a {
		text-decoration: none;
	}

	.menu-item {
		padding: 0;
		text-align: right;
		> button,
		> a {
			padding: 6px 16px;
		}
		> * {
			justify-content: flex-end;
			width: 100%;
			height: 100%;
		}
	}

	.menu-icon-on-avatar {
		background-color: ${({ theme }) =>
			theme?.palette?.background?.default};
		border-radius: 50%;
	}

	.header-btn {
		padding: 15px 16px;
		background-color: transparent;
		border-bottom: 3px solid
			${({ theme }) =>
				theme?.palette?.text?.secondary};
		&:hover {
			border-color: ${({ theme }) =>
				theme?.palette?.primary?.light};
			color: ${({ theme }) =>
				theme?.palette?.primary?.light};
		}
		&.active {
			color: ${({ theme }) =>
				theme?.palette?.primary?.main};
			border-color: ${({ theme }) =>
				theme?.palette?.primary?.main};
		}
		border-radius: 0;
		color: ${({ theme }) =>
			theme?.palette?.text?.primary};
	}

	.header-mobile-btn {
		text-align: right;
		font-size: 14px;
		color: ${({ theme }) =>
			theme?.palette?.text?.primary};
		background-color: transparent !important;
		&.active {
			color: ${({ theme }) =>
				theme?.palette?.primary?.main};
		}
	}

	.container {
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: row;
		position: relative;
		.icon {
			max-width: 100%;
			height: 45px;
			margin-right: 20px;
		}
		.tab-main {
			line-height: 60px;
			font-size: 30px;
		}
		.menu-info {
			font-size: 14px;
			margin-left: 30px;
			.call-text {
				> span {
					&:not(:last-child) {
						margin-right: 10px;
					}
				}
			}
		}
		.container-parts {
			display: flex;
			align-items: center;
			text-decoration: none;
		}
	}

	.container-right {
		margin-left: auto;
		button:not(:last-child) {
			margin-right: 15px;
		}
	}

	.mobile-menu {
		display: none;
	}

	.burger-menu {
		margin-left: 20px;
		.MuiButtonBase-root {
			margin: 0 !important;
		}
	}

	${CSSMediaSize.tablet} {
		flex-direction: column;
		.container {
			flex-direction: column;
			.container-parts {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				.icon {
					margin: 0 !important;
				}
			}
			.menu-info {
				flex-direction: row;
				margin: 0 !important;
				.call-text {
					display: flex;
					flex-direction: column;
					> span {
						margin: 0 !important;
					}
				}
				.mobile-menu {
					display: block;
					margin-left: auto;
				}
			}
		}
		.container-right {
			display: none;
		}
	}

	${CSSMediaSize.pc_small} {
		.container.container-left {
			flex-direction: column;
			.menu-info {
				margin: 0;
				align-self: flex-start;
			}
		}
	}
`;
