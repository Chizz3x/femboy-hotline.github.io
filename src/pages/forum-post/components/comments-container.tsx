import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	Tooltip,
} from '@mui/material';
import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	ExpandLess as ExpandLessIcon,
	ExpandMore as ExpandMoreIcon,
	Reply as ReplyIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Descendant } from 'slate';
import dayjs from '../../../utils/dayjs';
import {
	NForumPost,
	perPage,
} from '../ForumPost';
import { CustomEditor } from '../../../types/overrides/slate';
import buildApiRoute from '../../../utils/build-api-route';
import { API_ROUTES } from '../../../routes';
import { Auth } from '../../../utils/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { InputMarkdown } from '../../../components/inputs/markdown';
import classes from '../../../utils/classes';
import { DeletedTag } from '../../../components/tags/deleted-tag';
import { AnonymousTag } from '../../../components/tags/anonymous-tag';
import { EditedTag } from '../../../components/tags/edited-tag';
import { YouTag } from '../../../components/tags/you-tag';
import schemaPostReply from '../schema-post-reply';
import yupValidationResolver from '../../../utils/yupValidationResolver';
import { InfoHover } from '../../../components/info-hover';
import trimSlateValue from '../../../utils/trim-slate-value';
import getUserPicture from '../../../utils/get-user-picture';
import { USER_ROLE } from '../../../const';
import IconFemboyhotline from '../../../components/icons/icon-femboyhotline';
import { UserCard } from '../../../components/user-card';

const CommentsContainer = (
	props: NCommentContainer.ICommentsContainerProps,
) => {
	const navigate = useNavigate();

	const {
		root = false,
		user,
		comments,
		commentReplies,
		forumId,
		expandReplies,
		collapseReplies,
		fetchReplies,
		refetchComments,
		deleteComment,
	} = props;

	const [replyEditor, setReplyEditor] =
		React.useState<CustomEditor | null>(null);
	const [commentEditKey, setCommentEditKey] =
		React.useState<number>(Math.random());
	const [
		commentEditEditor,
		setCommentEditEditor,
	] = React.useState<CustomEditor | null>(null);
	const [replying, setReplying] = React.useState<
		any | null
	>(null);
	const [editingId, setEditingId] =
		React.useState<string | null>(null);

	const {
		register: registerPostReply,
		handleSubmit: handleSubmitPostReply,
		formState: {
			isSubmitting: isFormSubmittingPostReply,
		},
		setValue: setValuePostReply,
		reset: resetFormPostReply,
	} = useForm<NCommentContainer.IFormPostReply>({
		resolver: yupValidationResolver(
			schemaPostReply(),
		),
	});

	const onSubmitPostReply = handleSubmitPostReply(
		async (data) => {
			if (!replying) return;

			try {
				await axios.post(
					buildApiRoute(
						API_ROUTES.forumCommentNew,
						{
							id: forumId,
						},
					),
					{
						content: data.content,
						anonymous: data.anonymous,
						parent_id: replying?._id,
					},
					{
						headers: {
							Authorization: `Bearer ${Auth.getToken()}`,
							uniqueId: getUniqueId(),
						},
					},
				);

				await fetchReplies({
					id: replying?._id,
					refetch: true,
				});
				await fetchReplies({
					id: replying?.parent_id,
				});

				endReply();

				toast('Reply posted', {
					type: 'success',
				});
			} catch (error) {
				toast('Failed to post reply', {
					type: 'error',
				});
			}
		},
	);

	const fetchMore = (
		parentId: string,
		offset: number,
		limit: number,
	) => {
		fetchReplies({
			id: parentId,
			offset,
			limit,
			append: true,
		});
	};

	const startReply = (comment: any) => {
		resetFormPostReply();
		setReplying(comment);
	};

	const endReply = () => {
		setReplyEditor(null);
		setReplying(null);
	};

	const startEditing = (id: string) => {
		setEditingId(id);
	};

	const stopEditing = () => {
		setEditingId(null);
	};

	const submitEdited = (
		id: string,
		parentId?: string,
		index?: number,
	) => {
		editComment(id, parentId, index);
		stopEditing();
	};

	const editComment = async (
		id: string,
		parentId?: string,
		index?: number,
	) => {
		try {
			const res = await axios.post(
				buildApiRoute(
					API_ROUTES.forumCommentEdit,
					{
						id: forumId,
						commentId: id,
					},
				),
				{
					content: commentEditEditor?.children,
				},
				{
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				},
			);
			if (res?.data?.data?.success) {
				if (parentId) {
					fetchReplies({
						id: parentId,
						replace: true,
						offset: index,
						limit: 1,
					});
				} else {
					refetchComments();
				}
				toast('Post edited', {
					type: 'success',
				});
			} else {
				if (commentEditEditor)
					commentEditEditor.children =
						comments?.find(
							(c: any) => c?._id === id,
						)?.content;
				toast('Failed to edit post', {
					type: 'error',
				});
			}
		} catch (err) {
			if (commentEditEditor)
				commentEditEditor.children =
					comments?.find(
						(c: any) => c?._id === id,
					)?.content;
			toast('Failed to edit post', {
				type: 'error',
			});
		}
	};

	React.useEffect(() => {
		setCommentEditKey(Math.random());
	}, [commentEditEditor?.children, comments]);

	return (
		<CommentsContainerStyle
			className={classes(
				'comments-container',
				root ? 'comments-container-root' : null,
			)}
		>
			{comments?.map((m: any, i: number) => {
				return (
					<div
						key={m?._id}
						className="comment-item"
					>
						<div className="comment-item-left">
							{m?.anonymous || !m?.author ? (
								<Avatar
									alt="Anonymous"
									src="img/pictures/1.png"
								/>
							) : (
								<UserCard
									RenderElement={
										<Avatar
											alt={m?.author?.username}
											src={getUserPicture(
												m?.author,
											)}
										/>
									}
									props={{
										user: m?.author,
									}}
								/>
							)}
						</div>
						<div className="comment-item-right">
							<div className="comment-item-author">
								{m?.deleted_at ||
								m?.author_is_banned ||
								m?.anonymous ? (
									<AnonymousTag />
								) : (
									<UserCard
										RenderElement={
											<span>
												{m?.author?.username}
											</span>
										}
										props={{
											user: m?.author,
										}}
									/>
								)}
								{m?.author?.role ===
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
								{m?.author_id === user?._id ? (
									<YouTag />
								) : null}
							</div>
							<div className="comment-item-content">
								{m?.deleted_at ||
								m?.author_is_banned ? (
									<DeletedTag />
								) : (
									<>
										{m?.updated_at &&
										editingId !== m._id ? (
											<EditedTag
												tooltip={dayjs(
													m?.updated_at,
												).format(
													'YYYY-MM-DD HH:mm',
												)}
											/>
										) : null}
										<InputMarkdown
											key={commentEditKey}
											props={{
												editable:
													editingId === m._id,
												slateProps: {
													initialValue:
														m?.content || [],
												},
												getEditor:
													editingId === m._id
														? (edtr) => {
																setCommentEditEditor(
																	edtr,
																);
														  }
														: undefined,
											}}
										/>
									</>
								)}
							</div>

							{editingId === m?._id ? (
								<div className="editing-comment-buttons">
									<Button
										size="small"
										onClick={stopEditing}
									>
										Cancel
									</Button>
									<Button
										size="small"
										onClick={() =>
											submitEdited(
												m._id,
												m?.parent_id,
												i,
											)
										}
									>
										Save
									</Button>
								</div>
							) : null}

							<div className="comment-item-options">
								{m?.children_count ? (
									<div
										className="comment-item-show-replies-btn"
										onClick={() =>
											commentReplies[m._id]?.open
												? collapseReplies(m._id)
												: expandReplies(m._id)
										}
									>
										{commentReplies[m._id]
											?.open ? (
											<ExpandLessIcon />
										) : (
											<ExpandMoreIcon />
										)}
										<span>
											{commentReplies[m._id]?.open
												? 'Hide'
												: 'Show'}{' '}
											replies
										</span>
									</div>
								) : null}
								{m?.deleted_at ||
								m?.author_is_banned ||
								!user ? null : (
									<div
										className="comment-item-reply-btn"
										onClick={() =>
											replying?._id !== m._id
												? startReply(m)
												: null
										}
									>
										<ReplyIcon fontSize="small" />
										<span>Reply</span>
									</div>
								)}
								{user?._id === m?.author_id &&
								!m?.deleted_at ? (
									<>
										<div
											className="comment-item-edit"
											onClick={() =>
												startEditing(m._id)
											}
										>
											<EditIcon fontSize="small" />
											<span>Edit</span>
										</div>
										<div
											className="comment-item-delete"
											onClick={() =>
												deleteComment(
													m._id,
													m?.parent_id,
													i,
												)
											}
										>
											<DeleteIcon fontSize="small" />
											<span>Delete</span>
										</div>
									</>
								) : null}
							</div>
							{replying?._id === m?._id ? (
								<form
									className="comment-item-reply-box"
									onSubmit={onSubmitPostReply}
								>
									<InputMarkdown
										className="comment-item-reply-input"
										props={{
											editable: true,
											editableProps: {
												required: true,
												placeholder: 'Your reply',
											},
											slateProps: {
												onValueChange: (
													value,
												) => {
													setValuePostReply(
														'content',
														trimSlateValue(
															value,
														) || [],
													);
												},
											},
											getEditor: (edtr) =>
												setReplyEditor(edtr),
										}}
									/>
									<FormControlLabel
										className="checkbox"
										label={
											<div className="checkbox-label">
												<span>
													Reply as anonymous
												</span>
												<InfoHover text="Your account information will be hidden from all users except you." />
											</div>
										}
										control={
											<Checkbox
												{...registerPostReply(
													'anonymous',
												)}
											/>
										}
									/>
									<div className="comment-item-reply-buttons">
										<Button
											onClick={() => endReply()}
											disabled={
												isFormSubmittingPostReply
											}
										>
											Cancel
										</Button>
										<Button
											type="submit"
											disabled={
												isFormSubmittingPostReply
											}
										>
											Reply
										</Button>
									</div>
								</form>
							) : null}
							{commentReplies[m._id]?.open ? (
								<CommentsContainer
									user={user}
									comments={
										commentReplies[m._id].comments
									}
									commentReplies={commentReplies}
									forumId={forumId}
									expandReplies={expandReplies}
									collapseReplies={
										collapseReplies
									}
									fetchReplies={fetchReplies}
									refetchComments={
										refetchComments
									}
									deleteComment={deleteComment}
								/>
							) : null}
							{commentReplies[m._id]?.open &&
							m?.children_count >
								commentReplies[m._id]?.comments
									?.length ? (
								<span
									className="comment-item-show-more"
									onClick={() =>
										fetchMore(
											m._id,
											commentReplies[m._id]
												?.comments?.length,
											perPage,
										)
									}
								>
									Show more
								</span>
							) : null}
						</div>
					</div>
				);
			})}
		</CommentsContainerStyle>
	);
};

export { CommentsContainer };

export namespace NCommentContainer {
	export interface ICommentsContainerProps {
		root?: boolean;
		user: any;
		comments: any[];
		commentReplies: Record<
			string,
			ICommentMapItem
		>;
		forumId?: string;
		expandReplies: (id: string) => any;
		collapseReplies: (id: string) => any;
		fetchReplies: (
			props: NForumPost.IFetchProps,
		) => any;
		refetchComments: () => any;
		deleteComment: (
			id: string,
			parentId?: string,
			index?: number,
		) => any;
	}
	export interface ICommentMapItem {
		open: boolean;
		comments: any[];
	}

	export interface IFormPostReply {
		content: Descendant[];
		anonymous: boolean;
	}
}

const CommentsContainerStyle = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 15px;
	.comment-item {
		display: flex;
		column-gap: 20px;
		.comment-item-left {
			.MuiAvatar-root {
				cursor: pointer;
			}
		}
		.comment-item-right {
			display: flex;
			flex-direction: column;
			row-gap: 3px;
			width: 100%;
			.comment-item-content {
				display: flex;
				> .input-markdown {
					flex-grow: 1;
				}
				> .edited-tag {
					margin-right: 5px;
				}
			}
			.comment-item-author {
				display: flex;
				align-items: center;
				column-gap: 5px;
				> span:hover {
					text-decoration: underline;
					cursor: pointer;
				}
			}

			.comment-item-options {
				display: flex;
				column-gap: 5px;
				font-size: 12px;
				color: ${({ theme }) =>
					theme?.palette?.text?.secondary};
				> * {
					cursor: pointer;
					display: flex;
					align-items: center;
					column-gap: 2px;
					&:hover {
						color: ${({ theme }) =>
							theme?.palette?.primary?.main};
					}
				}
			}

			.comment-item-reply-box {
				margin-top: 10px;
				.comment-item-reply-input {
					min-height: 80px;
				}
				.comment-item-reply-buttons {
					display: flex;
					column-gap: 10px;
					margin-top: 10px;
				}
			}
			.comment-item-show-more {
				cursor: pointer;
				color: ${({ theme }) =>
					theme?.palette?.text?.secondary};
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`;
