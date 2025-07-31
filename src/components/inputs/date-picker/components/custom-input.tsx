import { InputBaseComponentProps } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import classes from '../../../../utils/classes';

const CustomInput = React.forwardRef<
	HTMLDivElement,
	NCustomInput.IProps
>((props, ref) => {
	const {
		displayFormat,
		value,
		className,
		...other
	} = props;

	return (
		<CustomInputStyle
			ref={ref}
			className={classes(
				'custom-input',
				className,
			)}
		>
			{value
				? value?.format?.(displayFormat)
				: ''}
		</CustomInputStyle>
	);
});

export { CustomInput };

export namespace NCustomInput {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends InputBaseComponentProps {
		//
	}
}

const CustomInputStyle = styled.div`
	user-select: none;
	min-height: 1.4375em;
	height: auto !important;
`;
