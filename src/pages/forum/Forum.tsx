import styled from 'styled-components';
import React from 'react';
import useAxios from 'axios-hooks';
import {
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import {
	Button,
	ButtonBase,
	InputAdornment,
	Skeleton,
	TextField,
} from '@mui/material';
import {
	Search as SearchIcon,
	Clear as ClearIcon,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import ForumCard from './components/forum-card';
import { API_ROUTES, ROUTES } from '../../routes';
import { Auth } from '../../utils/auth';
import { getUniqueId } from '../../scripts/unique-id-manager';
import { useAuth } from '../../components/contexts/auth';
import yupValidationResolver from '../../utils/yupValidationResolver';
import schema from './schema';
import { Paginator } from '../../components/paginator';
import {
	Guide,
	NGuide,
} from '../../components/guide';
import { CSSMediaSize } from '../../const';
import { JALeaderboard } from '../../components/juicyads/leaderbaord';

const guidePath: NGuide.IGuidePathItem[] = [
	{
		name: 'Home',
		route: ROUTES.home,
	},
	{
		name: 'Forum',
		route: ROUTES.forum,
	},
];

const getDefaultForm = (): NForum.IForm => {
	return {
		text: '',
	};
};

const perPage = 10;

const Forum = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] =
		useSearchParams();

	const { authed, seed: authedSeed } = useAuth();

	const [
		{ data: userData, loading: userDataLoading },
	] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.getMe,
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
		},
		{ autoCancel: true },
	);

	const [
		{
			data: forumData,
			loading: forumDataLoading,
		},
		getForum,
	] = useAxios(
		{
			method: 'GET',
			url: API_ROUTES.forumPosts,
		},
		{ manual: true, autoCancel: true },
	);

	const user = userData?.data?.user;
	const posts = forumData?.data?.posts;
	const totalPosts = forumData?.data?.total;

	const {
		register,
		handleSubmit,
		formState: {
			isLoading: isFormLoading,
			errors: formErrors,
		},
		setValue,
	} = useForm<NForum.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onFilter = handleSubmit(
		async (values) => {
			if (values.text) {
				searchParams.set('search', values.text);
			} else {
				searchParams.delete('search');
			}
			setSearchParams(searchParams);
		},
	);

	const clearSearch = () => {
		searchParams.delete('search');
		setSearchParams(searchParams);
	};

	const onPageChange = (page: number) => {
		if (page === 1) searchParams.delete('page');
		else
			searchParams.set('page', page.toString());
		setSearchParams(searchParams);
	};

	const fetchForum = () => {
		getForum({
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
			params: {
				withAuthors: true,
				offset:
					(Number(searchParams.get('page') || 1) -
						1) *
					perPage,
				limit: perPage,
				search: searchParams.get('search'),
			},
		});
	};

	React.useEffect(() => {
		fetchForum();
	}, [authedSeed, searchParams]);

	return (
		<ForumStyle>
			<JALeaderboard
				id={1097812}
				idMobile={1097813}
			/>
			<Guide path={guidePath} />
			<div className="forum-header">
				<form
					className="filter-form"
					onSubmit={onFilter}
				>
					<div className="filters-left">
						<TextField
							variant="outlined"
							size="small"
							placeholder="Search"
							InputProps={{
								...register('text'),
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment position="end">
										<ButtonBase
											disableRipple
											onClick={() => {
												clearSearch();
												setValue('text', '');
											}}
										>
											<ClearIcon />
										</ButtonBase>
									</InputAdornment>
								),
							}}
						/>
						<Button type="submit">Search</Button>
					</div>
					<div className="filters-right">
						<Button
							type="button"
							onClick={() =>
								navigate(ROUTES.forumPostNew)
							}
						>
							New post
						</Button>
					</div>
				</form>
			</div>
			<div className="forum-list">
				{forumDataLoading ? (
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
						isAuthor={
							user?._id === m?.author?._id
						}
						refetchPosts={fetchForum}
					/>
				))}
			</div>
			<Paginator
				props={{
					total: totalPosts,
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
			<JALeaderboard
				id={1097814}
				idMobile={1097815}
			/>
		</ForumStyle>
	);
};

export default Forum;

export namespace NForum {
	export interface IForm {
		text?: string;
	}
}

const ForumStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding: 20px 50px;

	.no-posts-message {
		display: flex;
		justify-content: center;
	}

	.forum-header {
		margin-bottom: 16px;
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		padding: 10px;
		width: 100%;
		box-sizing: border-box;
		border-radius: 10px;
		.filter-form {
			align-items: center;
			display: flex;
			column-gap: 12px;
			> * {
				width: 50%;
			}
			.filters-left {
				display: flex;
				column-gap: 12px;
			}
			.filters-right {
				display: flex;
				justify-content: flex-end;
				column-gap: 12px;
			}
		}
	}

	.forum-list {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		row-gap: 18px;
		padding: 12px;
	}

	.paginator {
		display: flex;
		justify-content: center;
	}

	${CSSMediaSize.phone_big} {
		padding: 20px 10px;
		.forum-header {
			.filter-form {
				flex-direction: column;
				row-gap: 10px;
				.filters-left {
					width: 100%;
				}
				.filters-right {
					justify-content: flex-start;
					width: 100%;
				}
			}
		}
	}
`;
