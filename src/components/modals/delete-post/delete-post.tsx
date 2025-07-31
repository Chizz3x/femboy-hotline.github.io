import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import { API_ROUTES } from '../../../routes';
import buildApiRoute from '../../../utils/build-api-route';
import { Auth } from '../../../utils/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';

const name = 'ModalDeletePost';
const Modal = (
	props: NModalDeletePost.IProps,
) => {
	const { forum, goTo, refetchPosts } = props;

	const navigate = useNavigate();

	const deletePost = async () => {
		try {
			const res = await axios.post(
				buildApiRoute(API_ROUTES.forumDelete, {
					id: forum?._id,
				}),
				undefined,
				{
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				},
			);

			if (res?.data?.data?.success) {
				refetchPosts?.();
				if (goTo) navigate(goTo);
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
			title="Are you sure you want to delete your post?"
			name={name}
		>
			<ModalDeletePostStyle>
				<Button onClick={closeModal}>No</Button>
				<Button onClick={deletePost}>Yes</Button>
			</ModalDeletePostStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalDeletePost {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		forum: any;
		goTo?: string;
		refetchPosts?: () => any;
	}
}

const ModalDeletePostStyle = styled.div`
	display: flex;
	justify-content: flex-end;
`;
