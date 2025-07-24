import { Tooltip } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const EditedTag = (props: NEditedTag.IProps) => {
	const { tooltip } = props;

	const MainItem = (
		<EditedTagStyle className="edited-tag">
			Edited
		</EditedTagStyle>
	);

	return tooltip ? (
		<Tooltip
			placement="top"
			title={tooltip}
			arrow
			PopperProps={{
				sx: {
					'.MuiTooltip-tooltip': {
						margin: '10px !important',
					},
				},
			}}
		>
			{MainItem}
		</Tooltip>
	) : (
		MainItem
	);
};

export { EditedTag };

export namespace NEditedTag {
	export interface IProps {
		tooltip?: string;
	}
}

const EditedTagStyle = styled.div`
	width: min-content;
	font-size: 11px;
	color: ${({ theme }) =>
		theme?.palette?.text?.primary};
	font-weight: 600;
	letter-spacing: 0;
	background-color: ${({ theme }) =>
		theme?.palette?.background?.paper};
	padding: 2px 6px;
	border-radius: 3px;
`;
