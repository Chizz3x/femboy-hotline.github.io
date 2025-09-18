import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import { API_ROUTES } from '../../../routes';
import buildApiRoute from '../../../utils/build-api-route';
import { Auth } from '../../../utils/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';

const name = 'ModalUnbanUser';
const Modal = (props: NModalUnbanUser.IProps) => {
	const { target, ...rest } = props;

	const unban = async () => {
		try {
			const res = await axios.post(
				buildApiRoute(API_ROUTES.userUnban),
				{
					target: target._id,
				},
				{
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				},
			);

			if (res?.data?.data?.success) {
				Auth.check();
				closeModal();
				toast('User unbanned', {
					type: 'success',
				});
			} else {
				toast('Failed to unban user', {
					type: 'error',
				});
			}
		} catch (err) {
			toast('Failed to unban user', {
				type: 'error',
			});
		}
	};

	const closeModal = () => {
		window.dispatchEvent(
			changeModals({ [name]: null }),
		);
	};

	return (
		<ModalLayout
			{...rest}
			showHeader
			hideCloseButton
			title={`Are you sure you want to unban ${target?.username} ?`}
			name={name}
		>
			<ModalClearUserInfoStyle>
				<Button onClick={closeModal}>No</Button>
				<Button onClick={unban}>Yes</Button>
			</ModalClearUserInfoStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalUnbanUser {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		target: any;
	}
}

const ModalClearUserInfoStyle = styled.div`
	display: flex;
	justify-content: flex-end;
`;
