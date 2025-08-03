import React from 'react';
import styled from 'styled-components';
import {
	IconButton,
	useMediaQuery,
} from '@mui/material';
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
		hideCloseButton,
		opacity = 'transparent',
		closeOnOverlay = true,
		blur = 5,
		width,
	} = props;

	const isTablet = useMediaQuery(
		CSSMediaSize.tablet,
	);

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
			data-blur={blur}
			data-width={width}
		>
			<div className="modal_inner">
				<div className="header">
					<div className="header-left">
						{isTablet ? (
							hideCloseButton ? null : (
								<IconButton
									onClick={closeModalOnHeader}
								>
									<CloseIcon />
								</IconButton>
							)
						) : !centerHeader ? (
							<h2>{title}</h2>
						) : null}
					</div>
					<div className="header-center">
						{isTablet || centerHeader ? (
							<h2>{title}</h2>
						) : null}
					</div>
					<div className="header-right">
						{isTablet ? null : hideCloseButton ? null : (
							<IconButton
								onClick={closeModalOnHeader}
							>
								<CloseIcon />
							</IconButton>
						)}
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
		opacity?:
			| 'transparent'
			| 'opaque'
			| 'invisible';
		blur?: number;
		closeOnOverlay?: boolean;
		hideCloseButton?: boolean;
		width?: string;
	}
}

const ModalLayoutStyle = styled.div<{
	'data-showheader'?: boolean;
	'data-centerheader'?: boolean;
	'data-opacity'?: NModalLayout.IProps['opacity'];
	'data-blur'?: NModalLayout.IProps['blur'];
	'data-width'?: NModalLayout.IProps['width'];
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
			? `${props?.theme?.palette?.background?.default}80`
			: props?.['data-opacity'] === 'invisible'
			? 'transparent'
			: props?.theme?.palette?.background
					?.default};
	backdrop-filter: blur(
		${(props) => props?.['data-blur']}px
	);
	overflow: hidden;
	.modal_inner {
		background-color: ${({ theme }) =>
			theme?.palette?.background?.default};
		padding: 20px;
		border-radius: 5px;
		position: relative;
		box-shadow: 0 0 15px
			${({ theme }) =>
				theme?.palette?.background?.default};
		max-height: calc(100vh - 100px);
		overflow-y: auto;
		padding-top: ${(props) =>
			props?.['data-showheader'] ? '0' : '20px'};
		${(props) =>
			props?.['data-width'] &&
			`width: ${props?.['data-width']};`}

		> .header {
			padding: 10px 0;
			display: ${(props) =>
				props?.['data-showheader']
					? 'flex'
					: 'none'};
			justify-content: space-evenly;
			position: sticky;
			top: 0;
			background-color: ${({ theme }) =>
				theme?.palette?.background?.default};

			> * {
				flex-grow: 1;
				flex-basis: 0;
				/*white-space: nowrap;*/
			}
			> .header-left {
				display: flex;
				flex-grow: 3;
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
				flex-direction: column;
				display: ${(props) =>
					props?.['data-showheader'] !== false
						? 'flex'
						: 'none'};
				text-align: center;
				.header-left {
					justify-content: flex-end;
				}
			}
		}
	}
`;
