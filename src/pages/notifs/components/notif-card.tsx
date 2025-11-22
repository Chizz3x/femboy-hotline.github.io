import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';
import {
	NOTIF_GOTO,
	NOTIF_ICONS,
	NOTIF_DATA,
} from '../../../utils/notif-types';
import { API_ROUTES } from '../../../routes';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { Auth } from '../../../utils/auth';
import { useDispatch } from '../../../store/store';
import { fetchNotifications } from '../../../store/slices/notifs';

const NotifCard = (props: NNotifCard.IProps) => {
	const { notif, ...rest } = props;

	const dispatch = useDispatch();

	const navigate = useNavigate();

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

	const goTo = async (to?: string) => {
		// if (notif.read) return;
		await readOne({
			data: {
				ids: [notif?._id],
			},
		});
		dispatch(fetchNotifications());
		if (!to) return;
		const isBlank = to.startsWith('_blank:');
		if (isBlank) to = to.slice(7);
		if (to.startsWith('http'))
			if (isBlank) window.open(to, '_blank');
			else window.location.href = to;
		else navigate(to);
	};

	const notifData = React.useMemo(() => {
		return NOTIF_DATA[notif?.type];
	}, [notif]);

	return (
		<NotifCardStyle
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
					<span>{notifData?.message || '-'}</span>
				</div>
				<div className="notif-bottom">
					{dayjs(notif?.created_at).format(
						'YYYY-MM-DD HH:mm',
					)}
				</div>
			</div>
		</NotifCardStyle>
	);
};

export default NotifCard;

export namespace NNotifCard {
	export interface IProps {
		notif: any;
	}
}

const NotifCardStyle = styled(ButtonBase)`
	color: ${({ theme }) =>
		theme?.palette?.text?.primary};
	display: flex;
	column-gap: 10px;
	position: relative;
	background-color: ${({ theme }) =>
		theme?.palette?.background_2
			?.default} !important;
	padding: 10px 15px !important;
	border-radius: 8px !important;
	width: 100%;
	justify-content: flex-start !important;
	&:hover {
		color: ${({ theme }) =>
			theme?.palette?.text?.primary};
	}
	.unread-dot {
		position: absolute;
		top: 0;
		left: 0;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: ${({ theme }) =>
			theme?.palette?.primary?.main};
		transform: translate(50%, -50%);
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
				margin-bottom: 6px;
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
