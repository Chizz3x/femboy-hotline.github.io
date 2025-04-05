import styled from 'styled-components';
import React from 'react';
import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';
import {
	Button,
	InputAdornment,
	TextField,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ForumCard from './components/forum-card';
import { API_ROUTES, ROUTES } from '../../routes';
import { Auth } from '../../utils/auth';
import { getUniqueId } from '../../scripts/unique-id-manager';
import { useAuth } from '../../components/contexts/auth';
import yupValidationResolver from '../../utils/yupValidationResolver';
import schema from './schema';

const testData = [
	{
		id: '1',
		name: 'title',
		content: 'content here',
	},
	{
		id: '2',
		name: 'title 2',
		content: 'content 2 here',
	},
];

const getDefaultForm = (): NForums.IForm => {
	return {
		text: '',
	};
};

const Forums = () => {
	const navigate = useNavigate();

	const { authed, seed: authedSeed } = useAuth();

	const [
		{ data: userData, loading: userDataLoading },
		getUser,
	] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.getMe,
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
			},
			data: {
				uniqueId: getUniqueId(),
			},
		},
		{ manual: true, autoCancel: true },
	);
	const user = userData?.data?.user;

	const {
		register,
		handleSubmit,
		formState: {
			isLoading: isFormLoading,
			errors: formErrors,
		},
		reset: resetForm,
	} = useForm<NForums.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			try {
				console.log('values', values);
			} catch (error: any) {
				console.error(error);
				toast(error.message || 'Unknown error', {
					type: 'error',
				});
			}
		},
	);

	React.useEffect(() => {
		if (authed) {
			const resp = getUser();
			(async () => {
				const d = await resp;
				if (!d?.data?.data?.user) {
					navigate(ROUTES.home);
				}
			})();
		}
	}, [authed, authedSeed]);

	return (
		<ForumsStyle>
			<div className="forum-header">
				<form
					className="filter-form"
					onSubmit={onSubmit}
				>
					<div className="filters-left">
						<TextField
							variant="outlined"
							size="small"
							type="search"
							InputProps={{
								...register('text'),
								endAdornment: (
									<InputAdornment position="end">
										<SearchIcon />
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
				{testData.map((m, i) => (
					<ForumCard key={i} forum={m} />
				))}
			</div>
		</ForumsStyle>
	);
};

export default Forums;

export namespace NForums {
	export interface IForm {
		text?: string;
	}
}

const ForumsStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding: 20px 50px;

	.forum-header {
		width: 100%;
		margin-bottom: 16px;
		background-color: var(--c-p2);
		padding: 10px;
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
		overflow-y: auto;
		row-gap: 18px;
		padding: 12px;
	}
`;
