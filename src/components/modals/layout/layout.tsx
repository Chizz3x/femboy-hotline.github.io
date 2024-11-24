import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { NModals, changeModals } from '../modals';
import { CSSMediaSize } from '../../../const';

const ModalLayout = (
	props: NModalLayout.IProps,
) => {
	const {
		children,
		name,
		title,
		showHeader,
		centerHeader,
	} = props;

	const closeModal: React.MouseEventHandler<
		HTMLDivElement
	> = (event) => {
		if (event.currentTarget === event.target) {
			window.dispatchEvent(
				changeModals({ [name]: null }),
			);
		}
	};

	const closeModalOnHeader = () => {
		window.dispatchEvent(
			changeModals({ [name]: null }),
		);
	};

	return (
		<ModalLayoutStyle
			className="Modal"
			onClick={closeModal}
			showHeader={showHeader}
			centerHeader={centerHeader}
		>
			<div className="modal_inner">
				<div className="header">
					<div className="header-left">
						{!centerHeader ? (
							<h2>{title}</h2>
						) : null}
					</div>
					<div className="header-center">
						{centerHeader ? (
							<h2>{title}</h2>
						) : null}
					</div>
					<div className="header-right">
						<IconButton
							onClick={closeModalOnHeader}
						>
							<CloseIcon />
						</IconButton>
					</div>
				</div>
				{children}
			</div>
		</ModalLayoutStyle>
	);
};

export { ModalLayout };

export namespace NModalLayout {
	export interface IProps
		extends NModals.IDefaultProps {
		children?: JSX.Element;
		name: string;
	}
}

const ModalLayoutStyle = styled.div<{
	showHeader?: boolean;
	centerHeader?: boolean;
}>`
	height: 100vh;
	width: 100vw;
	position: absolute;
	z-index: 9999;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--c-p1-aa);
	backdrop-filter: blur(5px);
	overflow: hidden;
	.modal_inner {
		background-color: var(--c-p1);
		padding: 20px;
		border-radius: 5px;
		position: relative;
		box-shadow: 0 0 15px var(--c-p1);
		max-height: calc(100vh - 100px);
		overflow-y: auto;
		padding-top: ${({ showHeader }) =>
			showHeader ? '0' : '20px'};

		> .header {
			padding: 10px 15px;
			display: ${({ showHeader }) =>
				showHeader ? 'flex' : 'none'};
			justify-content: space-evenly;
			position: sticky;
			top: 0;
			background-color: var(--c-p1);

			> * {
				flex-grow: 1;
				flex-basis: 0;
			}
			> .header-left {
				display: flex;
			}
			> .header-right {
				display: flex;
				justify-content: flex-end;
			}
			> .header-center {
				display: flex;
				justify-content: center;
			}
		}
	}

	${CSSMediaSize.tablet} {
		.modal_inner {
			padding-top: 0;
			> .header {
				display: flex;
			}
		}
	}
`;
