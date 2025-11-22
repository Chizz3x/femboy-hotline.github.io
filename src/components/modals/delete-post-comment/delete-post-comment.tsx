import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import { API_ROUTES } from '../../../routes';
import buildApiRoute from '../../../utils/build-api-route';
import { Auth } from '../../../utils/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { NForumPost } from '../../../pages/forum-post/ForumPost';

const name = 'ModalDeletePostComment';
const Modal = (
	props: NModalDeletePostComment.IProps,
) => {
	const {
		forum,
		commentId,
		parentId,
		index,
		refetchComments,
		refetchReplies,
	} = props;

	// TODO: Refetch specific comment container instead of refetchComments()
	const deletePostComment = async () => {
		try {
			const res = await axios.post(
				buildApiRoute(
					API_ROUTES.forumCommentDelete,
					{
						post_id: forum?._id,
						commentId,
					},
				),
				undefined,
				{
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				},
			);

			if (res?.data?.data?.success) {
				if (parentId) {
					refetchReplies({
						id: parentId,
						replace: true,
						offset: index,
						limit: 1,
					});
				} else {
					refetchComments();
				}
				closeModal();
				toast('Post deleted', {
					type: 'success',
				});
			} else {
				toast('Failed to delete post', {
					type: 'error',
				});
			}
		} catch (err) {
			toast('Failed to delete post', {
				type: 'error',
			});
		}
	};

	const closeModal = () => {
		window.dispatchEvent(
			changeModals({ [name]: null }),
		);
	};

	return (
		<ModalLayout
			{...props}
			showHeader
			hideCloseButton
			title="Are you sure you want to delete your comment?"
			name={name}
		>
			<ModalDeletePostCommentStyle>
				<Button onClick={closeModal}>No</Button>
				<Button onClick={deletePostComment}>
					Yes
				</Button>
			</ModalDeletePostCommentStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalDeletePostComment {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		forum: any;
		commentId: string;
		parentId?: string;
		index?: number;
		refetchComments: () => any;
		refetchReplies: (
			props: NForumPost.IFetchProps,
		) => any;
	}
}

const ModalDeletePostCommentStyle = styled.div`
	display: flex;
	justify-content: flex-end;
`;
