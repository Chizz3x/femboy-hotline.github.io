import styled, {
	useTheme,
} from 'styled-components';
import React from 'react';
import {
	Avatar,
	Badge,
	IconButton,
	Tooltip,
	useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
	Delete as DeleteIcon,
	SpeakerNotes as SpeakerNotesIcon,
	UnfoldMore as UnfoldMoreIcon,
} from '@mui/icons-material';
import dayjs from '../../../../utils/dayjs';
import { ROUTES } from '../../../../routes';
import buildRoute from '../../../../utils/build-route';
import {
	CSSMediaSize,
	USER_ROLE,
} from '../../../../const';
import { changeModals } from '../../../../components/modals/modals';
import { AnonymousTag } from '../../../../components/tags/anonymous-tag';
import { YouTag } from '../../../../components/tags/you-tag';
import { PrivateTag } from '../../../../components/tags/private-tag';
import getUserPicture from '../../../../utils/get-user-picture';
import IconFemboyhotline from '../../../../components/icons/icon-femboyhotline';
import { UserCard } from '../../../../components/user-card';

const ForumAuthor = (
	props: NForumCard.IForumAuthorProps,
) => {
	const { forum, isAuthor } = props;

	const navigate = useNavigate();

	let ForumAuthorComp = (
		<div className="forum-author-inner">
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
				{forum?.author?.role ===
				USER_ROLE.OWNER ? (
					<Tooltip
						placement="top"
						arrow
						title="Owner"
					>
						<span>
							<IconFemboyhotline />
						</span>
					</Tooltip>
				) : null}
				<div className="forum-author-details-bottom">
					{isAuthor ? <YouTag /> : null}
				</div>
			</div>
		</div>
	);

	if (!forum?.anonymous) {
		ForumAuthorComp = (
			<UserCard
				RenderElement={ForumAuthorComp}
				props={{
					user: forum?.author,
				}}
			/>
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

	const theme = useTheme();

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

	const CommentsCounter = (
		<Badge
			className="comments-counter"
			overlap="circular"
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			sx={{
				'& .MuiBadge-badge': {
					minWidth: 16,
					height: 16,
					fontSize: '0.65rem',
					padding: 0,
					backgroundColor:
						theme?.palette?.background?.default,
					color:
						(forum?.comment_count || 0) > 0
							? theme?.palette?.text?.primary
							: theme?.palette?.text?.secondary,
				},
			}}
			badgeContent={forum?.comment_count || 0}
			max={99}
			showZero
			color="default"
		>
			<Avatar
				sx={{
					width: 26,
					height: 26,
					backgroundColor: 'transparent',
				}}
			>
				<SpeakerNotesIcon
					sx={{
						fill:
							(forum?.comment_count || 0) > 0
								? theme?.palette?.text?.primary
								: theme?.palette?.text?.secondary,
					}}
				/>
			</Avatar>
		</Badge>
	);

	const VotesCounter = (
		<Badge
			className="votes-counter"
			overlap="circular"
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			sx={{
				'& .MuiBadge-badge': {
					minWidth: 16,
					height: 16,
					fontSize: '0.65rem',
					padding: 0,
					backgroundColor:
						theme?.palette?.background?.default,
					color:
						(forum?.votes?.score || 0) > 0
							? theme?.palette?.text?.primary
							: theme?.palette?.text?.secondary,
				},
			}}
			badgeContent={forum?.votes?.score || 0}
			max={99}
			showZero
			color="default"
		>
			<Avatar
				sx={{
					width: 26,
					height: 26,
					backgroundColor: 'transparent',
				}}
			>
				<UnfoldMoreIcon
					sx={{
						fill:
							(forum?.votes?.score || 0) > 0
								? theme?.palette?.text?.primary
								: theme?.palette?.text?.secondary,
					}}
				/>
			</Avatar>
		</Badge>
	);

	const LeftContainer = (
		<>
			<div className="post-badges">
				{!isPhone ? VotesCounter : null}
				{!isPhone ? CommentsCounter : null}
			</div>
			{!forum?.public ? <PrivateTag /> : null}
			<div className="forum-title">
				<span>{forum?.title}</span>
			</div>
		</>
	);

	const MiddleContainer = (
		<div
			className="forum-author"
			onClick={(e) => e.stopPropagation()}
		>
			<ForumAuthor
				forum={forum}
				isAuthor={isAuthor}
			/>
		</div>
	);

	const RightContainer = (
		<>
			{isPhone ? CommentsCounter : null}
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
			className="forum-card"
			onClick={(e: React.MouseEvent) =>
				navigate(
					buildRoute(ROUTES.forumPost, {
						post_id: forum?._id,
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
		box-shadow: 0 0 8px 0
			${({ theme }) =>
				theme?.palette?.background?.paper};
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
		.forum-author-inner {
			display: flex;
			align-items: center;
		}
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
		column-gap: 12px;
		.post-badges {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			row-gap: 3px;
			column-gap: 6px;
		}
	}
	.middle-container {
		display: flex;
		column-gap: 12px;
		align-items: center;
	}
	.right-container {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		column-gap: 12px;
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
