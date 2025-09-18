import { Info as InfoIcon } from '@mui/icons-material';
import {
	SvgIconTypeMap,
	Tooltip,
	TooltipProps,
} from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const InfoHover = (props: NInfoHover.IProps) => {
	const { text, tooltipProps, iconProps } = props;

	return (
		<InfoHoverStyle className="info-hover">
			<Tooltip
				title={text}
				placement="top"
				arrow
				PopperProps={{
					sx: {
						zIndex: '9999',
						'.MuiTooltip-tooltip': {
							margin: '10px !important',
						},
					},
				}}
				{...tooltipProps}
			>
				<InfoIcon
					fontSize="small"
					{...iconProps}
				/>
			</Tooltip>
		</InfoHoverStyle>
	);
};

export { InfoHover };

export namespace NInfoHover {
	export interface IProps {
		text: string;
		tooltipProps?: Partial<TooltipProps>;
		iconProps?: Partial<SvgIconTypeMap>;
	}
}

const InfoHoverStyle = styled.span`
	color: ${({ theme }) =>
		theme?.palette?.text?.secondary};
	display: inline-flex;
	align-items: center;
	justify-content: center;
`;
