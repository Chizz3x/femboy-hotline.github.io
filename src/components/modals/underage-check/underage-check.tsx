import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import { ROUTES } from '../../../routes';
import { sessionStorageSet } from '../../../utils/session-storage';
import { localStorageSet } from '../../../utils/local-storage';

const name = 'ModalUnderageCheck';
const Modal = (
	props: NModalUnderageCheck.IProps,
) => {
	const navigate = useNavigate();

	const closeModal = () => {
		sessionStorageSet('underage', 'false');
		localStorageSet('ageChecked', 'true');
		window.dispatchEvent(
			changeModals({ [name]: null }),
		);
	};

	const isUnderage = () => {
		sessionStorageSet('underage', 'true');
		window.dispatchEvent(
			changeModals({ [name]: null }),
		);
		navigate(ROUTES.safePlace);
	};

	return (
		<ModalLayout
			{...props}
			opacity="opaque"
			showHeader={false}
			name={name}
			closeOnOverlay={false}
		>
			<ModalUnderageCheckStyle>
				<div className="underage-check-container">
					<span>
						Are you under the age of 18?
					</span>
				</div>
				<div className="underage-check-buttons">
					<Button onClick={closeModal}>No</Button>
					<Button onClick={isUnderage}>
						Yes
					</Button>
				</div>
			</ModalUnderageCheckStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalUnderageCheck {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		//
	}
}

const ModalUnderageCheckStyle = styled.div`
	.underage-check-container {
		margin-bottom: 10px;
	}
	.underage-check-buttons {
		display: flex;
		justify-content: flex-end;
	}
`;
