import { Button } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { changeModals } from '../../../components/modals/modals';

const ModControls = (
	props: NModControls.IProps,
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
		<ModControlsStyle {...rest}>
			<h3>Mod controls</h3>
			<div className="controls">
				<Button
					variant="outlined"
					onClick={user?.banned_at ? unban : ban}
				>
					{user?.banned_at ? 'Unban' : 'Ban'}
				</Button>
			</div>
		</ModControlsStyle>
	);
};

export default ModControls;

export namespace NModControls {
	export interface IProps {
		user: any;
	}
}

const ModControlsStyle = styled.div`
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
