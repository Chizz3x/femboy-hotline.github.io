import styled from 'styled-components';
import React from 'react';
import {
	Avatar,
	ButtonBase,
	IconButton,
	Tooltip,
	useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon } from '@mui/icons-material';
import dayjs from '../../../../utils/dayjs';
import { ROUTES } from '../../../../routes';
import buildRoute from '../../../../utils/build-route';
import { CSSMediaSize } from '../../../../const';
import { changeModals } from '../../../../components/modals/modals';
import { AnonymousTag } from '../../../../components/tags/anonymous-tag';
import { YouTag } from '../../../../components/tags/you-tag';
import { PrivateTag } from '../../../../components/tags/private-tag';
import getUserPicture from '../../../../utils/get-user-picture';

const ForumAuthor = (
	props: NForumCard.IForumAuthorProps,
) => {
	const { forum, isAuthor } = props;

	const navigate = useNavigate();

	let ForumAuthorComp = (
		<>
			<Avatar
				alt={
					forum?.anonymous
						? 'Anonymous'
						: forum?.author?.username
				}
				sx={{ width: 24, height: 24 }}
				src={
					forum?.anonymous
						? '/img/pictures/1.png'
						: getUserPicture(forum.author)
				}
			/>
			<div className="forum-author-details">
				<div className="forum-author-details-top">
					<span className="forum-author-name">
						{forum?.anonymous ? (
							<AnonymousTag />
						) : (
							forum?.author?.username
						)}
					</span>
				</div>
				<div className="forum-author-details-bottom">
					{isAuthor ? <YouTag /> : null}
				</div>
			</div>
		</>
	);

	if (!forum?.anonymous) {
		ForumAuthorComp = (
			<Tooltip
				title="Visit profile"
				placement="right"
				arrow
			>
				<ButtonBase
					disableRipple
					onClick={(e: React.MouseEvent) => {
						e.stopPropagation();
						navigate(
							buildRoute(ROUTES.userId, {
								id: forum?.author?._id,
							}),
						);
					}}
				>
					{ForumAuthorComp}
				</ButtonBase>
			</Tooltip>
		);
	}

	return ForumAuthorComp;
};

const ForumCard = (props: NForumCard.IProps) => {
	const {
		forum,
		isAuthor = false,
		refetchPosts,
	} = props;

	const isPhone = useMediaQuery(
		CSSMediaSize.phone,
	);

	const navigate = useNavigate();

	const deletePost: React.MouseEventHandler<
		HTMLButtonElement
	> = async (e) => {
		e.stopPropagation();

		window.dispatchEvent(
			changeModals({
				ModalDeletePost: {
					open: true,
					forum,
					refetchPosts,
				},
			}),
		);
	};

	const LeftContainer = (
		<>
			{!forum?.public ? <PrivateTag /> : null}
			<div className="forum-title">
				<span>{forum?.title}</span>
			</div>
		</>
	);

	const MiddleContainer = (
		<div className="forum-author">
			<ForumAuthor
				forum={forum}
				isAuthor={isAuthor}
			/>
		</div>
	);

	const RightContainer = (
		<>
			<span className="created-at">
				{dayjs(forum.created_at).format(
					'YYYY-MM-DD HH:mm',
				)}
			</span>
			{isAuthor ? (
				<IconButton onClick={deletePost}>
					<DeleteIcon />
				</IconButton>
			) : null}
		</>
	);

	return (
		<ForumCardStyle
			onClick={(e: React.MouseEvent) =>
				navigate(
					buildRoute(ROUTES.forumPost, {
						id: forum?._id,
					}),
				)
			}
		>
			<div className="left-container">
				{isPhone
					? MiddleContainer
					: LeftContainer}
			</div>
			<div className="middle-container">
				{isPhone
					? LeftContainer
					: MiddleContainer}
			</div>
			<div className="right-container">
				{RightContainer}
			</div>
		</ForumCardStyle>
	);
};

export default ForumCard;

export namespace NForumCard {
	export interface IProps {
		forum: any;
		isAuthor?: boolean;
		refetchPosts: () => any;
	}

	export interface IForumAuthorProps {
		forum: any;
		isAuthor?: boolean;
	}
}

const ForumCardStyle = styled.div`
	display: flex;
	border-radius: 6px;
	padding: 6px 12px;
	box-shadow: 0 0 8px -2px var(--c-p);
	background-color: ${({ theme }) =>
		theme?.palette?.background_2?.paper};
	transition: box-shadow 0.1s ease-in-out;
	column-gap: 10px;
	row-gap: 10px;
	cursor: pointer;
	min-height: 52px;
	&:hover {
		box-shadow: 0 0 8px 0 var(--c-p);
	}
	> * {
		flex: 1;
	}
	.created-at {
		font-size: 12px;
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
	}
	.forum-author {
		display: flex;
		align-items: center;
		.forum-author-details {
			margin-left: 7px;
			display: flex;
			align-items: flex-start;
			row-gap: 3px;
			column-gap: 5px;
			.forum-author-name {
				color: ${({ theme }) =>
					theme?.palette?.text?.secondary};
			}
		}
	}
	.left-container {
		/*overflow: hidden;*/
		display: flex;
		align-items: center;
		max-width: 300px;
		column-gap: 5px;
	}
	.middle-container {
		display: flex;
		align-items: center;
	}
	.right-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		column-gap: 5px;
	}

	.forum-title {
		font-size: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	${CSSMediaSize.phone} {
		row-gap: 5px;
		flex-direction: column;
		.left-container {
			max-width: 100%;
			overflow: visible;
		}
		.left-container-right {
			margin-left: auto;
		}
		/*.middle-container {
			flex-basis: 100%;
		}*/
	}

	${CSSMediaSize.tablet} {
		/*.right-container {
			flex-basis: 100%;
		}*/
	}
`;
