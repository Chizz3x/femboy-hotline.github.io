import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import { API_ROUTES } from '../../../routes';
import buildApiRoute from '../../../utils/build-api-route';
import { Auth } from '../../../utils/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';

const name = 'ModalClearUserInfo';
const Modal = (
	props: NModalClearUserInfo.IProps,
) => {
	const clearInfo = async () => {
		try {
			const res = await axios.post(
				buildApiRoute(API_ROUTES.userUpdateInfo),
				undefined,
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
				toast('Information cleared!', {
					type: 'success',
				});
			} else {
				toast('Failed to clear info', {
					type: 'error',
				});
			}
		} catch (err) {
			toast('Failed to clear info', {
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
			{...props}
			showHeader
			hideCloseButton
			title="Are you ure you want to clear all of your profile information?"
			name={name}
		>
			<ModalClearUserInfoStyle>
				<Button onClick={closeModal}>No</Button>
				<Button onClick={clearInfo}>Yes</Button>
			</ModalClearUserInfoStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalClearUserInfo {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		//
	}
}

const ModalClearUserInfoStyle = styled.div`
	display: flex;
	justify-content: flex-end;
`;
