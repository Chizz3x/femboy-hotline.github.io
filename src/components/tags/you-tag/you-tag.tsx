import React from 'react';
import styled from 'styled-components';

const YouTag = () => {
	return (
		<YouTagStyle className="you-tag">
			YOU
		</YouTagStyle>
	);
};

export { YouTag };

const YouTagStyle = styled.div`
	font-size: 10px;
	color: black;
	font-weight: 600;
	letter-spacing: 0;
	background-color: ${({ theme }) =>
		theme?.palette?.primary?.main};
	padding: 2px 3px;
	border-radius: 3px;
`;
