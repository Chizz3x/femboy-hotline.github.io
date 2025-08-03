import React from 'react';
import styled from 'styled-components';

const NotImplemented = (
	props: NNotImplemented.IProps,
) => {
	return (
		<NotImplementedStyle>
			<h3>Not implemented yet.</h3>
			<p>
				If you use this, it might not work or work
				in an unexpected way so it is highly
				advised not to touch anything in here!
				(Worst case scenario, your account
				disappears :P)
			</p>
		</NotImplementedStyle>
	);
};

export { NotImplemented };

export namespace NNotImplemented {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps {
		//
	}
}

const NotImplementedStyle = styled.div`
	background-color: ${({ theme }) =>
		theme?.palette?.error?.main};
	border-radius: 12px;
	padding: 12px;
`;
