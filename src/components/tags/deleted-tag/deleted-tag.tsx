import React from 'react';
import styled from 'styled-components';

const DeletedTag = () => {
	return (
		<DeletedTagStyle className="deleted-tag">
			DELETED
		</DeletedTagStyle>
	);
};

export { DeletedTag };

const DeletedTagStyle = styled.div`
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
