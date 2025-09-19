import React from 'react';
import styled from 'styled-components';

const PrivateTag = () => {
	return (
		<PrivateTagStyle className="private-tag">
			PRIVATE
		</PrivateTagStyle>
	);
};

export { PrivateTag };

const PrivateTagStyle = styled.div`
	width: min-content;
	height: min-content;
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
