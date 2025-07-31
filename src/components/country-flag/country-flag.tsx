import React from 'react';
import styled from 'styled-components';
import { countryCodeToCodepoint } from '../../utils/country-code-to-codepoint';
import { CODE_TO_FLAG } from '../../countries';
import classes from '../../utils/classes';

const CountryFlag = (
	props: NCountryFlag.Props,
) => {
	const { code, width = 24, height } = props;

	const [fileName, setFileName] =
		React.useState('');

	React.useEffect(() => {
		if (CODE_TO_FLAG.has(code)) {
			setFileName(countryCodeToCodepoint(code));
		}
	}, [code]);

	if (!fileName) return null;

	return (
		<CountryFlagStyle
			className={classes(
				'country-flag-box',
				`country-flag-${code}`,
				fileName,
			)}
		>
			<img
				alt={fileName}
				src={`img/twemoji/${fileName}.svg`}
				style={{
					width,
					height,
				}}
			/>
		</CountryFlagStyle>
	);
};

export { CountryFlag };

export namespace NCountryFlag {
	export interface Props {
		code: string;
		width?: number;
		height?: number;
	}
}

const CountryFlagStyle = styled.span`
	display: inline-flex;
	align-items: center;
`;
