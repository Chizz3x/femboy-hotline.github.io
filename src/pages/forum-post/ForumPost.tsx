import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ForumPost = () => {
	const params = useParams();

	const forumId = params.id;

	return (
		<ForumPostStyle>
			<div className="post-container">
				<div className="post-title">
					<span>Title</span>
				</div>
				<div className="post-content">
					<p>some text here</p>
				</div>
			</div>
		</ForumPostStyle>
	);
};

export default ForumPost;

export namespace NForumPost {
	//
}

const ForumPostStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding: 20px 50px;
`;
