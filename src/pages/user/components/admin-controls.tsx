import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { changeModals } from '../../../components/modals/modals';

const AdminControls = (
	props: NAdminControls.IProps,
) => {
	const { user, ...rest } = props;

	const ban = async () => {
		window.dispatchEvent(
			changeModals({
				ModalBanUser: {
					open: true,
					target: user,
				},
			}),
		);
	};

	const unban = () => {
		window.dispatchEvent(
			changeModals({
				ModalUnbanUser: {
					open: true,
					target: user,
				},
			}),
		);
	};

	return (
		<AdminControlsStyle {...rest}>
			<h3>Admin controls</h3>
			<div className="controls">
				<Button
					variant="outlined"
					onClick={user?.banned_at ? unban : ban}
				>
					{user?.banned_at ? 'Unban' : 'Ban'}
				</Button>
			</div>
		</AdminControlsStyle>
	);
};

export default AdminControls;

export namespace NAdminControls {
	export interface IProps {
		user: any;
	}
}

const AdminControlsStyle = styled.div`
	background-color: ${({ theme }) =>
		theme?.palette?.background_2?.default};
	border-radius: 10px;
	padding: 20px 30px;

	> h3 {
		margin-bottom: 15px;
	}

	.controls {
		display: flex;
		row-gap: 10px;
		column-gap: 10px;
	}
`;
