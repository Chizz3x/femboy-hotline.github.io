import {
	ArrowLeft as ArrowLeftIcon,
	NavigateNext as NavigateNextIcon,
} from '@mui/icons-material';
import React from 'react';
import {
	Link,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import {
	IconButton,
	Tooltip,
} from '@mui/material';
import classes from '../../utils/classes';
import { ROUTES } from '../../routes';

const Guide = (props: NGuide.IProps) => {
	const { path, hideBack = false } = props;

	const location = useLocation();
	const navigate = useNavigate();

	const goBack = () => {
		navigate(
			path[path.length - 2]?.route || ROUTES.home,
		);
	};

	return (
		<GuideStyle>
			{!hideBack ? (
				<Tooltip
					title="Go back"
					arrow
					placement="top"
					slotProps={{
						popper: {
							sx: {
								'.MuiTooltip-tooltip': {
									margin: '10px !important',
								},
							},
						},
					}}
				>
					<IconButton
						size="small"
						className="guide-go-back"
						onClick={goBack}
					>
						<ArrowLeftIcon />
					</IconButton>
				</Tooltip>
			) : null}
			{path.map((m, i) => (
				<div key={i} className="guide-component">
					<div
						key={`guide-${i}`}
						className={classes(
							'guide-item',
							location.pathname === m?.route
								? 'active'
								: '',
						)}
					>
						<span>
							{location.pathname === m?.route ? (
								m?.name
							) : (
								<Link to={m?.route}>
									{m?.name}
								</Link>
							)}
						</span>
					</div>
					{i < path.length - 1 ? (
						<NavigateNextIcon
							key={`guide-arrow-${i}`}
							className="guide-arrow"
						/>
					) : null}
				</div>
			))}
		</GuideStyle>
	);
};

export { Guide };

export namespace NGuide {
	export interface IProps {
		path: IGuidePathItem[];
		hideBack?: boolean;
	}

	export interface IGuidePathItem {
		name: string;
		route: string;
	}
}

const GuideStyle = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	.guide-go-back {
		margin-right: 5px;
	}
	.guide-component {
		display: flex;
		flex-direction: row;
	}
	.guide-item {
		&.active {
			color: ${({ theme }) =>
				theme?.palette?.text?.secondary};
		}
		a {
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	.guide-arrow {
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
	}
`;
