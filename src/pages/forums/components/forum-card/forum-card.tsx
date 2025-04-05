import styled from 'styled-components';
import React from 'react';

const ForumCard = (props: NForumCard.IProps) => {
	const { forum } = props;

	return (
		<ForumsCardStyle>
			<div className="left-container">a</div>
			<div className="middle-container">b</div>
			<div className="right-container">c</div>
		</ForumsCardStyle>
	);
};

export default ForumCard;

export namespace NForumCard {
	export interface IProps {
		forum: any;
	}
}

const ForumsCardStyle = styled.div`
	display: flex;
	border-radius: 6px;
	padding: 6px 12px;
	box-shadow: 0 0 8px -2px var(--c-p);
	background-color: var(--c-p2-66);
	transition: box-shadow 0.1s ease-in-out;
	&:hover {
		box-shadow: 0 0 8px 0 var(--c-p);
	}
	> * {
		flex: 1;
	}
	.right-container {
		display: flex;
		justify-content: flex-end;
	}
`;
