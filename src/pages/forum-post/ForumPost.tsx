import useAxios from 'axios-hooks';
import React from 'react';
import {
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom';
import styled from 'styled-components';
import {
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	Skeleton,
	TextField,
	Tooltip,
} from '@mui/material';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Descendant } from 'slate';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
	ArrowDropDown as ArrowDropDownIcon,
	ArrowDropUp as ArrowDropUpIcon,
} from '@mui/icons-material';
import dayjs from '../../utils/dayjs';
import { API_ROUTES, ROUTES } from '../../routes';
import buildApiRoute from '../../utils/build-api-route';
import { getUniqueId } from '../../scripts/unique-id-manager';
import { Auth } from '../../utils/auth';
import { InputMarkdown } from '../../components/inputs/markdown';
import { useAuth } from '../../components/contexts/auth';
import { CustomEditor } from '../../types/overrides/slate';
import cleanSlateEditor from '../../utils/clean-slate-editor';
import buildRoute from '../../utils/build-route';
import { Paginator } from '../../components/paginator';
import {
	CommentsContainer,
	NCommentContainer,
} from './components/comments-container';
import { changeModals } from '../../components/modals/modals';
import yupValidationResolver from '../../utils/yupValidationResolver';
import schemaPostEdit from './schema-post-edit';
import trimSlateValue from '../../utils/trim-slate-value';
import { EditedTag } from '../../components/tags/edited-tag';
import { InfoHover } from '../../components/info-hover';
import schemaPostComment from './schema-post-comment';
import { AnonymousTag } from '../../components/tags/anonymous-tag';
import { YouTag } from '../../components/tags/you-tag';
import {
	Guide,
	NGuide,
} from '../../components/guide';
import classes from '../../utils/classes';
import {
	CSSMediaSize,
	USER_ROLE,
} from '../../const';
import getUserPicture from '../../utils/get-user-picture';
import IconDiscord from '../../components/icons/icon-discord';
import { CopyButton } from '../../components/copy-button';
import IconFemboyhotline from '../../components/icons/icon-femboyhotline';

const getGuidePath = (
	forumId: string,
): NGuide.IGuidePathItem[] => {
	return [
		{
			name: 'Home',
			route: ROUTES.home,
		},
		{
			name: 'Forum',
			route: ROUTES.forum,
		},
		{
			name: 'Post',
			route: buildRoute(ROUTES.forumPost, {
				id: forumId,
			}),
		},
	];
};

export const perPage = 10;

const ForumPost = () => {
	const params = useParams();

	const forumId = params.id;

	const navigate = useNavigate();
	const [searchParams, setSearchParams] =
		useSearchParams();
	const [editingPost, setEditingPost] =
		React.useState(false);
	const [guidePath] = React.useState(
		getGuidePath(forumId || ''),
	);

	const { authed, seed: authedSeed } = useAuth();

	const [commentEditor, setCommentEditor] =
		React.useState<CustomEditor | null>(null);
	const [postEditor, setPostEditor] =
		React.useState<CustomEditor | null>(null);
	const [commentMap, setCommentMap] =
		React.useState<
			Record<
				string,
				NCommentContainer.ICommentMapItem
			>
		>({});

	const [slateKey, setSlateKey] =
		React.useState(0);

	const [
		{ data: userData, loading: userDataLoading },
		getMe,
	] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.getMe,
		},
		{ manual: true, autoCancel: true },
	);
	const user = userData?.data?.user;

	const [
		{
			data: forumData,
			loading: forumDataLoading,
		},
		fetchPost,
	] = useAxios(
		{
			method: 'GET',
			url: buildApiRoute(API_ROUTES.forumPost, {
				id: forumId,
			}),
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
			params: {
				withAuthor: true,
			},
		},
		{ autoCancel: true },
	);

	const [
		{
			data: forumCommentData,
			loading: forumCommentDataLoading,
		},
		getComments,
	] = useAxios(
		{
			method: 'GET',
			url: buildApiRoute(
				API_ROUTES.forumComments,
				{
					id: forumId,
				},
			),
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
		},
		{ manual: true, autoCancel: true },
	);

	const [
		{
			data: votePostData,
			loading: votePostLoading,
		},
		votePost,
	] = useAxios(
		{
			method: 'POST',
			url: buildApiRoute(API_ROUTES.forumVote, {
				id: forumId,
			}),
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
		},
		{ manual: true, autoCancel: true },
	);

	const forum = forumData?.data?.post;
	const comments: any[] =
		forumCommentData?.data?.comments || [];
	const siblingComments =
		forumCommentData?.data?.siblings || 0;

	const onPageChange = (page: number) => {
		if (page === 1) searchParams.delete('page');
		else
			searchParams.set('page', page.toString());
		setSearchParams(searchParams);
	};

	const {
		register: registerPostComment,
		handleSubmit: handleSubmitPostComment,
		formState: {
			isLoading: isFormLoadingPostComment,
			errors: formErrorsPostComment,
		},
		setValue: setValuePostComment,
		reset: resetFormPostComment,
	} = useForm<NForumPost.IFormPostComment>({
		resolver: yupValidationResolver(
			schemaPostComment(),
		),
	});

	const onSubmitPostComment =
		handleSubmitPostComment(async (values) => {
			await axios.post(
				buildApiRoute(
					API_ROUTES.forumCommentNew,
					{
						id: forumId,
					},
				),
				{
					content: values.content,
					anonymous: values.anonymous,
				},
				{
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				},
			);

			cleanSlateEditor(commentEditor);
			resetFormPostComment();

			fetchComments();
		});

	const fetchComments = () => {
		getComments({
			params: {
				withAuthor: true,
				offset:
					(Number(searchParams.get('page') || 1) -
						1) *
					perPage,
				limit: perPage,
			},
		});
	};

	const fetchReplies = async (
		props: NForumPost.IFetchProps,
	) => {
		const {
			id,
			open,
			refetch = false,
			limit = perPage,
			offset = 0,
			append = false,
			replace = false,
		} = props || {};

		const res = await axios.get(
			buildApiRoute(API_ROUTES.forumComments, {
				id: forumId,
			}),
			{
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					uniqueId: getUniqueId(),
				},
				params: {
					withAuthor: true,
					offset,
					limit,
					parentId: id,
				},
			},
		);
		if (res.status === StatusCodes.OK) {
			setCommentMap((cm) => ({
				...cm,
				[id]: {
					open:
						typeof open === 'boolean'
							? open
							: cm[id]?.open,
					comments: append
						? [
								...(cm[id]?.comments || []),
								...(res.data?.data?.comments ||
									[]),
						  ]
						: replace
						? [
								...(cm[id]?.comments.slice(
									0,
									offset,
								) || []),
								...(res.data?.data?.comments ||
									[]),
								...(cm[id]?.comments.slice(
									offset + limit,
								) || []),
						  ]
						: res.data?.data?.comments,
				},
			}));

			if (refetch) {
				fetchComments();
			}
		}
	};

	const expandReplies = async (id: string) => {
		if (!commentMap[id]) {
			fetchReplies({ id, open: true });
		} else {
			setCommentMap((cm) => ({
				...cm,
				[id]: {
					...cm[id],
					open: true,
				},
			}));
		}
	};

	const collapseReplies = (id: string) => {
		setCommentMap((cm) => ({
			...cm,
			[id]: {
				...cm[id],
				open: false,
			},
		}));
	};

	const deleteComment = (
		id: string,
		parentId?: string,
		index?: number,
	) => {
		window.dispatchEvent(
			changeModals({
				ModalDeletePostComment: {
					open: true,
					forum,
					commentId: id,
					parentId,
					index,
					refetchComments: fetchComments,
					refetchReplies: fetchReplies,
				},
			}),
		);
	};

	const deletePost = async () => {
		window.dispatchEvent(
			changeModals({
				ModalDeletePost: {
					open: true,
					goTo: ROUTES.forum,
					forum,
				},
			}),
		);
	};

	const {
		register: registerPostEdit,
		handleSubmit: handleSubmitPostEdit,
		formState: {
			isLoading: isFormLoadingPostEdit,
			errors: formErrorsPostEdit,
		},
		setValue: setValuePostEdit,
		reset: resetFormPostEdit,
	} = useForm<NForumPost.IFormPostEdit>({
		resolver: yupValidationResolver(
			schemaPostEdit(),
		),
	});

	const onSubmitPostEdit = handleSubmitPostEdit(
		async (values) => {
			const res = await axios.post(
				buildApiRoute(API_ROUTES.forumEdit, {
					id: forum?._id,
				}),
				{
					title: values.title,
					content: values.content,
				},
				{
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				},
			);

			if (res?.data?.data?.success) {
				fetchPost();

				toast('Post edited', {
					type: 'success',
				});
			} else {
				toast('Failed to edit post', {
					type: 'error',
				});
			}

			endPostEdit();
		},
	);

	const startPostEdit = () => {
		setEditingPost(true);
		resetFormPostEdit({
			title: forum?.title,
			content: forum?.content,
		});
	};

	const endPostEdit = () => {
		setEditingPost(false);
		if (postEditor)
			postEditor.children = forum?.content;
	};

	const votePostHandler = async (
		vote: number,
	) => {
		if (authed) {
			await votePost({
				data: {
					vote,
				},
			});
			fetchPost();
		}
	};

	React.useEffect(() => {
		setSlateKey(Math.random());
	}, [forum]);

	React.useEffect(() => {
		if (authed) {
			getMe({
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					uniqueId: getUniqueId(),
				},
			});
		}
	}, [authedSeed]);

	React.useEffect(() => {
		fetchComments();
	}, [searchParams, authedSeed]);

	return (
		<ForumPostStyle>
			<Guide path={guidePath} />
			<div className="post-container">
				<div className="post-author-container">
					<div className="post-author-left">
						{forum?.anonymous ? (
							<Avatar
								alt="Anonymous"
								src="/img/pictures/1.png"
							/>
						) : (
							<Tooltip
								title="Visit profile"
								placement="top"
								arrow
							>
								<Avatar
									alt={forum?.author?.username}
									src={getUserPicture(
										forum?.author,
									)}
									imgProps={{
										onClick: () =>
											navigate(
												buildRoute(
													ROUTES.userId,
													{
														id: forum?.author_id,
													},
												),
											),
									}}
								/>
							</Tooltip>
						)}
					</div>
					<div className="post-author-right">
						<div className="post-author-right-top">
							{forum?.anonymous ? (
								<span>
									<AnonymousTag />
								</span>
							) : (
								<span
									className="post-author-username"
									onClick={() =>
										navigate(
											buildRoute(ROUTES.userId, {
												id: forum?.author_id,
											}),
										)
									}
								>
									{forum?.author?.username}
								</span>
							)}
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
							{forum?.author_id === user?._id ? (
								<YouTag />
							) : null}
							{forum?.author?.discord ? (
								<span className="author-discord">
									<IconDiscord />
									{
										forum?.author?.discord
											?.username
									}
									<CopyButton
										data={
											forum?.author?.discord
												?.username
										}
									/>
								</span>
							) : null}
						</div>
						<div className="post-author-right-bottom">
							{/*  */}
						</div>
					</div>
				</div>
				<form onSubmit={onSubmitPostEdit}>
					<div className="post-title">
						{editingPost ? (
							<TextField
								label="Title"
								size="small"
								required
								error={!!formErrorsPostEdit.title}
								helperText={
									formErrorsPostEdit.title
										?.message
								}
								inputProps={{
									...registerPostEdit('title'),
								}}
							/>
						) : (
							<>
								{forum?.updated_at ? (
									<EditedTag
										tooltip={dayjs(
											forum?.updated_at,
										).format('YYYY-MM-DD HH:mm')}
									/>
								) : null}
								<h2>{forum?.title}</h2>
							</>
						)}
					</div>
					<div className="post-content">
						<InputMarkdown
							key={slateKey}
							props={{
								editable: editingPost,
								slateProps: {
									initialValue:
										forum?.content || [],
									onValueChange: (value) => {
										setValuePostEdit(
											'content',
											trimSlateValue(value) || [],
										);
									},
								},
								getEditor: (edtr) =>
									setPostEditor(edtr),
							}}
						/>
					</div>
					{editingPost ? (
						<div className="post-edit-buttons">
							<Button
								disabled={isFormLoadingPostEdit}
								onClick={endPostEdit}
							>
								Cancel
							</Button>
							<Button
								disabled={isFormLoadingPostEdit}
								type="submit"
							>
								Save
							</Button>
						</div>
					) : null}
				</form>
				{!userDataLoading && user ? (
					<div className="post-user-options">
						<div className="vote-box">
							<Button
								className={classes(
									'vote-up-btn',
									forum?.voted_for === 1
										? 'vote-voted'
										: '',
								)}
								size="small"
								endIcon={<ArrowDropUpIcon />}
								onClick={() =>
									forum?.voted_for === 1
										? votePostHandler(0)
										: votePostHandler(1)
								}
								disabled={votePostLoading}
							>
								{forum?.votes?.up || 0}
							</Button>
							<Button
								className={classes(
									'vote-down-btn',
									forum?.voted_for === -1
										? 'vote-voted'
										: '',
								)}
								size="small"
								endIcon={<ArrowDropDownIcon />}
								onClick={() =>
									forum?.voted_for === -1
										? votePostHandler(0)
										: votePostHandler(-1)
								}
								disabled={votePostLoading}
							>
								{forum?.votes?.down || 0}
							</Button>
						</div>
					</div>
				) : null}
				{user?._id === forum?.author_id &&
				!editingPost ? (
					<div className="post-manager">
						<Button
							size="small"
							onClick={startPostEdit}
						>
							Edit
						</Button>
						<Button
							size="small"
							onClick={deletePost}
						>
							Delete
						</Button>
					</div>
				) : null}
				{!userDataLoading && user ? (
					<div className="post-comment-new">
						<div className="comment-new-left">
							<Tooltip
								title="Visit profile"
								placement="top"
								arrow
							>
								{userDataLoading ? (
									<Skeleton
										variant="circular"
										width={40}
										height={40}
									/>
								) : (
									<Avatar
										alt={user.username}
										src={getUserPicture(user)}
										imgProps={{
											onClick: () =>
												navigate(
													buildRoute(
														ROUTES.userId,
														{ id: user._id },
													),
												),
										}}
									/>
								)}
							</Tooltip>
						</div>
						<div className="comment-new-right">
							<div className="comment-new-right-inner">
								<div className="comment-new-author">
									<span
										onClick={() =>
											navigate(
												buildRoute(
													ROUTES.userId,
													{ id: user._id },
												),
											)
										}
									>
										{user?.username}
									</span>
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
								</div>
								<form
									onSubmit={onSubmitPostComment}
								>
									<InputMarkdown
										props={{
											editable: true,
											editableProps: {
												required: true,
												placeholder:
													'Your comment',
											},
											error:
												formErrorsPostComment
													?.content?.message,
											slateProps: {
												onValueChange: (
													value,
												) => {
													setValuePostComment(
														'content',
														trimSlateValue(
															value,
														) || [],
													);
												},
											},
											getEditor: (edtr) =>
												setCommentEditor(edtr),
										}}
									/>
									<div className="comment-new-options">
										<div className="comment-new-options-left">
											<FormControlLabel
												className="checkbox"
												label={
													<div className="checkbox-label">
														<span>
															Comment as anonymous
														</span>
														<InfoHover text="Your account information will be hidden from all users except you." />
													</div>
												}
												control={
													<Checkbox
														{...registerPostComment(
															'anonymous',
														)}
													/>
												}
											/>
										</div>
										<div className="comment-new-options-right">
											<Button
												disabled={
													isFormLoadingPostComment
												}
												type="submit"
											>
												Post
											</Button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				) : !userDataLoading && !user ? (
					<div className="post-comment-new-not-logged">
						<span className="post-comment-new-not-logged-text">
							Want to comment? Please{' '}
							<span
								className="post-comment-new-register-btn"
								onClick={() =>
									navigate(ROUTES.register)
								}
							>
								Register
							</span>{' '}
							or{' '}
							<span
								className="post-comment-new-login-btn"
								onClick={() =>
									navigate(ROUTES.login)
								}
							>
								Log in
							</span>{' '}
							!
						</span>
					</div>
				) : null}
				<CommentsContainer
					root
					user={user}
					comments={comments}
					commentReplies={commentMap}
					forumId={forumId}
					expandReplies={expandReplies}
					collapseReplies={collapseReplies}
					fetchReplies={fetchReplies}
					refetchComments={fetchComments}
					deleteComment={deleteComment}
				/>
				<Paginator
					props={{
						total: siblingComments,
						perPage,
					}}
					paginationProps={{
						page: Number(
							searchParams.get('page') || 1,
						),
						onChange: (_, page) =>
							onPageChange(page),
					}}
				/>
			</div>
		</ForumPostStyle>
	);
};

export default ForumPost;

export namespace NForumPost {
	export interface IFetchProps {
		id: string;
		open?: boolean;
		refetch?: boolean;
		limit?: number;
		offset?: number;
		append?: boolean;
		replace?: boolean;
	}

	export interface IFormPostEdit {
		title: string;
		content: Descendant[];
	}

	export interface IFormPostComment {
		content: Descendant[];
		anonymous: boolean;
	}
}

const ForumPostStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding: 20px 50px;

	.checkbox-label {
		display: flex;
		align-items: center;
		column-gap: 5px;
	}

	.post-manager {
		margin-top: 10px;
		display: flex;
		column-gap: 10px;
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		padding: 10px;
		border-radius: 10px;
	}

	.post-title {
		margin-bottom: 12px;
		> h2 {
			overflow-wrap: break-word;
		}
	}

	.post-container {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
	}

	.post-author-container {
		display: flex;
		column-gap: 20px;
		margin-bottom: 15px;
		.post-author-left {
			.MuiAvatar-root {
				cursor: pointer;
			}
		}
		.post-author-right {
			.post-author-right-top {
				display: flex;
				column-gap: 5px;
				align-items: center;
				.author-discord {
					font-size: 14px;
					margin-left: 10px;
					display: inline-flex;
					align-items: center;
					column-gap: 5px;
					color: ${({ theme }) =>
						theme?.palette?.text?.secondary};
				}
			}
			.post-author-username {
				cursor: pointer;
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}

	.comments-container-root {
		margin-top: 20px;
	}

	.post-content {
		margin-bottom: 20px;
	}

	.post-user-options {
		margin-top: 10px;
		display: flex;
		.vote-box {
			.vote-up-btn,
			.vote-down-btn {
				&.vote-voted {
					color: ${({ theme }) =>
						theme?.palette?.primary?.main};
				}
			}

			.vote-up-btn {
				color: ${({ theme }) =>
					theme?.palette?.text?.primary};
			}
			.vote-down-btn {
				color: ${({ theme }) =>
					theme?.palette?.text?.primary};
			}
		}
	}

	.post-comment-new {
		width: 100%;
		margin-top: 50px;
		display: flex;
		column-gap: 20px;
		min-height: 150px;
		.comment-new-left {
			.MuiAvatar-root {
				cursor: pointer;
			}
		}
		.comment-new-right {
			overflow: hidden;
			max-width: 100%;
			flex-grow: 1;
			flex-shrink: 1;
			.comment-new-right-inner {
				display: flex;
				flex-direction: column;
				row-gap: 10px;
				height: 100%;
				.comment-new-author {
					display: flex;
					column-gap: 5px;
					&:hover {
						text-decoration: underline;
						cursor: pointer;
					}
				}
				.input-markdown {
					flex-grow: 1;
				}
				> button {
					align-self: flex-end;
				}
				.comment-new-options {
					display: flex;
					justify-content: space-between;
					margin-top: 8px;
					.comment-new-options-left {
						//
					}
					.comment-new-options-right {
						//
					}
				}
			}
		}
	}

	.paginator {
		display: flex;
		justify-content: center;
		margin-top: auto;
	}

	.post-comment-new-not-logged {
		.post-comment-new-not-logged-text {
			.post-comment-new-register-btn,
			.post-comment-new-login-btn {
				cursor: pointer;
				color: ${({ theme }) =>
					theme?.palette?.primary?.main};
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}

	${CSSMediaSize.phone_big} {
		padding: 20px 10px;
		.comments-container-root {
			overflow-x: auto;
		}
		.post-author-container {
			.post-author-right {
				.post-author-right-top {
					flex-wrap: wrap;
				}
			}
		}
	}
`;
