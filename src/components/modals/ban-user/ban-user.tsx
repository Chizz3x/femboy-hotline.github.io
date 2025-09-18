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

const name = 'ModalBanUser';
const Modal = (props: NModalBanUser.IProps) => {
	const { target, ...rest } = props;

	const [reason, setReason] = React.useState('');

	const ban = async () => {
		try {
			const res = await axios.post(
				buildApiRoute(API_ROUTES.userBan),
				{
					target: target._id,
					reason,
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
				toast('User banned', {
					type: 'success',
				});
			} else {
				toast('Failed to ban user', {
					type: 'error',
				});
			}
		} catch (err) {
			toast('Failed to ban user', {
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
			title={`Are you sure you want to ban ${target?.username} ?`}
			name={name}
		>
			<ModalClearUserInfoStyle>
				<div className="content">
					<TextField
						label="Reason"
						onChange={(e) =>
							setReason(e.target.value)
						}
					/>
				</div>
				<div className="buttons">
					<Button onClick={closeModal}>No</Button>
					<Button onClick={ban}>Yes</Button>
				</div>
			</ModalClearUserInfoStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalBanUser {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		target: any;
	}
}

const ModalClearUserInfoStyle = styled.div`
	padding: 15px 0;
	row-gap: 10px;
	display: flex;
	flex-direction: column;
	.content {
		> * {
			width: 100%;
		}
	}
	.buttons {
		display: flex;
		justify-content: flex-end;
	}
`;
