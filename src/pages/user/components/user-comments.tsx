import React from 'react';
import styled from 'styled-components';

const UserComments = (
	props: NUserComments.IProps,
) => {
	const { user, isMe = false, ...rest } = props;

	return (
		<UserCommentsStyle {...rest}>
			WIP
		</UserCommentsStyle>
	);
};

export default UserComments;

export namespace NUserComments {
	export interface IProps
		extends React.HTMLAttributes<HTMLDivElement> {
		user: any;
		isMe?: boolean;
	}
}

const UserCommentsStyle = styled.div`
	background-color: ${({ theme }) =>
		theme?.palette?.background_2?.default};
	border-radius: 10px;
	padding: 20px 30px;
	display: flex;
	justify-content: space-between;
	width: 100%;
`;
