import useAxios from 'axios-hooks';
import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { API_ROUTES } from '../../../routes';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { Auth } from '../../../utils/auth';
import buildApiRoute from '../../../utils/build-api-route';
import ForumCard from '../../forum/components/forum-card';
import { Paginator } from '../../../components/paginator';

const perPage = 10;

const UserPosts = (props: NUserPosts.IProps) => {
	const { user, isMe = false, ...rest } = props;

	const [searchParams, setSearchParams] =
		useSearchParams();

	const [
		{
			data: userPosts,
			loading: userPostsLoading,
		},
		getUserPosts,
	] = useAxios(
		{
			method: 'GET',
			url: buildApiRoute(API_ROUTES.userPosts, {
				id: user?._id,
			}),
		},
		{ manual: true, autoCancel: true },
	);

	const posts = userPosts?.data?.posts || [];
	const totalPosts = userPosts?.data?.total || 0;

	const fetchPosts = () => {
		getUserPosts({
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
			params: {
				withVotes: true,
				withAuthor: true,
				countComments: true,
				offset:
					(Number(
						searchParams.get('posts-page') || 1,
					) -
						1) *
					perPage,
				limit: perPage,
			},
		});
	};

	const onPageChange = (page: number) => {
		if (page === 1)
			searchParams.delete('posts-page');
		else
			searchParams.set(
				'posts-page',
				page.toString(),
			);
		setSearchParams(searchParams);
	};

	React.useEffect(() => {
		if (user?._id) {
			fetchPosts();
		}
	}, [user?._id, searchParams]);

	return (
		<UserPostsStyle {...rest}>
			{userPostsLoading ? (
				Array.from({ length: perPage }).map(
					(_, i) => (
						<Skeleton
							key={i}
							height={50}
							variant="rectangular"
						/>
					),
				)
			) : !posts?.length ? (
				<div className="no-posts-message">
					No posts
				</div>
			) : null}
			{posts?.map((m: any, i: number) => (
				<ForumCard
					key={i}
					forum={m}
					isAuthor={isMe}
					refetchPosts={fetchPosts}
				/>
			))}
			<Paginator
				props={{
					total: totalPosts,
					perPage,
				}}
				paginationProps={{
					page: Number(
						searchParams.get('posts-page') || 1,
					),
					onChange: (_, page) =>
						onPageChange(page),
				}}
			/>
		</UserPostsStyle>
	);
};

export default UserPosts;

export namespace NUserPosts {
	export interface IProps
		extends React.HTMLAttributes<HTMLDivElement> {
		user: any;
		isMe?: boolean;
	}
}

const UserPostsStyle = styled.div`
	background-color: ${({ theme }) =>
		theme?.palette?.background_2?.default};
	border-radius: 10px;
	padding: 20px 30px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	row-gap: 18px;
	width: 100%;
	.paginator {
		align-self: center;
	}
	.forum-card {
		background-color: ${({ theme }) =>
			theme?.palette?.background?.default};
	}
`;
