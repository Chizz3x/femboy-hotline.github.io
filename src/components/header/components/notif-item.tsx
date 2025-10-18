import { MenuItem } from '@mui/material';
import React, {
	ComponentPropsWithRef,
} from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';
import {
	NOTIF_GOTO,
	NOTIF_ICONS,
	NOTIF_TYPES,
} from '../../../utils/notif-types';
import { API_ROUTES } from '../../../routes';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { Auth } from '../../../utils/auth';
import { useDispatch } from '../../../store/store';
import { fetchNotifications } from '../../../store/slices/notifs';

const NotifItem = (props: NNotifItem.IProps) => {
	const { notif, closeMenu, ...rest } = props;

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const notifData = React.useMemo(() => {
		return NOTIF_TYPES[notif?.type];
	}, [notif]);

	const goTo = async (to?: string) => {
		if (notif.read) return;
		await readOneNotif();
		if (!to) return;
		const isBlank = to.startsWith('_blank:');
		if (isBlank) to = to.slice(7);
		if (to.startsWith('http'))
			if (isBlank) window.open(to, '_blank');
			else window.location.href = to;
		else navigate(to);
	};

	const [, readOne] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.readNotifs,
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

	const readOneNotif = async () => {
		await readOne({
			data: {
				ids: [notif?._id],
			},
		});
		dispatch(fetchNotifications());
	};

	return (
		<NotifItemStyle
			{...rest}
			onClick={() =>
				goTo(
					NOTIF_GOTO[
						notif?.go_to || notifData?.goTo
					],
				)
			}
		>
			{!notif?.read ? (
				<div className="unread-dot" />
			) : null}
			<div className="notif-left">
				<div className="notif-icon">
					{NOTIF_ICONS[notif?.variant]}
				</div>
			</div>
			<div className="notif-right">
				<div className="notif-top">
					<h3>{notifData?.name || 'Unknown'}</h3>
					<h4>{notifData?.title}</h4>
					<span className="clamp-text">
						{notifData?.message || '-'}
					</span>
				</div>
				<div className="notif-bottom">
					{dayjs(notif?.created_at).format(
						'YYYY-MM-DD HH:mm',
					)}
				</div>
			</div>
		</NotifItemStyle>
	);
};

export default NotifItem;

export namespace NNotifItem {
	export interface IProps
		extends ComponentPropsWithRef<'li'> {
		notif: any;
		closeMenu: () => void;
	}
}

const NotifItemStyle = styled(MenuItem)`
	display: flex;
	column-gap: 10px;
	padding: 3px 6px !important;
	margin: 6px 16px !important;
	position: relative;
	.unread-dot {
		position: absolute;
		top: 0;
		right: 0;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: ${({ theme }) =>
			theme?.palette?.primary?.main};
		transform: translate(50%, -50%);
	}
	.clamp-text {
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		white-space: normal;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.notif-left {
		align-self: flex-start;
		.notif-icon {
			> svg {
				color: ${({ theme }) =>
					theme?.palette?.text?.secondary};
			}
		}
	}
	.notif-right {
		font-size: 14px;
		text-align: left;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.notif-top {
			display: flex;
			flex-direction: column;
			column-gap: 10px;
			> h3 {
				color: ${({ theme }) =>
					theme?.palette?.text?.secondary};
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			> h4 {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.notif-bottom {
			font-size: 12px;
			margin-top: 5px;
			color: ${({ theme }) =>
				theme?.palette?.text?.secondary};
		}
	}
`;
