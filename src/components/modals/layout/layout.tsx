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
		opacity = 'transparent',
		closeOnOverlay = true,
	} = props;

	const closeModal: React.MouseEventHandler<
		HTMLDivElement
	> = (event) => {
		if (!closeOnOverlay) return;
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
			data-opacity={opacity}
			onClick={closeModal}
			data-showheader={showHeader}
			data-centerheader={centerHeader}
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
		opacity?: 'transparent' | 'opaque';
		closeOnOverlay?: boolean;
	}
}

const ModalLayoutStyle = styled.div<{
	'data-showheader'?: boolean;
	'data-centerheader'?: boolean;
	'data-opacity'?: NModalLayout.IProps['opacity'];
}>`
	height: 100vh;
	width: 100vw;
	position: absolute;
	z-index: 9999;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${(props) =>
		props?.['data-opacity'] === 'transparent'
			? 'var(--c-p1-aa)'
			: 'var(--c-p1)'};
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
		padding-top: ${(props) =>
			props?.['data-showheader'] ? '0' : '20px'};

		> .header {
			padding: 10px 0;
			display: ${(props) =>
				props?.['data-showheader']
					? 'flex'
					: 'none'};
			justify-content: space-evenly;
			position: sticky;
			top: 0;
			background-color: var(--c-p1);

			> * {
				flex-grow: 1;
				flex-basis: 0;
				white-space: nowrap;
			}
			> .header-left {
				display: flex;
			}
			> .header-center {
				display: flex;
				justify-content: center;
			}
			> .header-right {
				display: flex;
				justify-content: flex-end;
				margin-left: 10px;
			}
		}
	}

	${CSSMediaSize.tablet} {
		.modal_inner {
			padding-top: 0;
			> .header {
				display: ${(props) =>
					props?.['data-showheader'] !== false
						? 'flex'
						: 'none'};
			}
		}
	}
`;
