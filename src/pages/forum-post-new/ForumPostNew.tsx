import {
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
	Tooltip,
} from '@mui/material';
import React from 'react';
import {
	Controller,
	useForm,
} from 'react-hook-form';
import styled from 'styled-components';
import { Descendant } from 'slate';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom';
import yupValidationResolver from '../../utils/yupValidationResolver';
import schema from './schema';
import { InputMarkdown } from '../../components/inputs/markdown';
import trimSlateValue from '../../utils/trim-slate-value';
import { API_ROUTES, ROUTES } from '../../routes';
import { Auth } from '../../utils/auth';
import { getUniqueId } from '../../scripts/unique-id-manager';
import { InfoHover } from '../../components/info-hover';
import {
	Guide,
	NGuide,
} from '../../components/guide';
import { CSSMediaSize } from '../../const';

const guidePath: NGuide.IGuidePathItem[] = [
	{
		name: 'Home',
		route: ROUTES.home,
	},
	{
		name: 'Forum',
		route: ROUTES.forum,
	},
	{
		name: 'New Post',
		route: ROUTES.forumPostNew,
	},
];

const getDefaultForm =
	(): NForumPostNew.IForm => {
		return {
			title: '',
			content: [],
			public: true,
			anonymous: false,
		};
	};

const ForumPostNew = () => {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: {
			isLoading: isFormLoading,
			errors: formErrors,
		},
		setValue,
		control,
	} = useForm<NForumPostNew.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const [, createNewPost] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.forumNew,
		},
		{ manual: true, autoCancel: true },
	);

	const onSubmit = handleSubmit(
		async (values) => {
			const res = await createNewPost({
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					uniqueId: getUniqueId(),
				},
				data: {
					...values,
				},
			});

			if (
				res?.data?.statusCode === StatusCodes.OK
			) {
				toast('Post created', {
					type: 'success',
				});
				navigate(ROUTES.forum);
			} else {
				toast('Failed to create post', {
					type: 'error',
				});
			}
		},
	);

	return (
		<ForumPostNewStyle>
			<Guide path={guidePath} />
			<div className="new-forum-post-container">
				<div className="heading">
					<h2>Create new post</h2>
				</div>
				<form
					className="new-forum-post-content"
					onSubmit={onSubmit}
					noValidate
				>
					<div className="new-forum-post-fields">
						<TextField
							label="Title"
							size="small"
							required
							error={!!formErrors?.title}
							helperText={
								formErrors?.title?.message
							}
							inputProps={{
								...register('title'),
							}}
						/>
						<InputMarkdown
							props={{
								editable: true,
								editableProps: {
									required: true,
									placeholder:
										'Your post content',
								},
								error:
									formErrors?.content?.message,
								slateProps: {
									onValueChange: (value) => {
										setValue(
											'content',
											trimSlateValue(value) || [],
										);
									},
								},
							}}
						/>

						<FormControlLabel
							control={
								<Controller
									name="public"
									control={control}
									render={({ field }) => (
										<Checkbox
											{...field}
											checked={field.value}
										/>
									)}
								/>
							}
							label={
								<div className="checkbox-label">
									<span>Public</span>
									<InfoHover text="Whether this post should be visible by users who do not have an account on this platform" />
								</div>
							}
						/>
						<FormControlLabel
							className="checkbox"
							label={
								<div className="checkbox-label">
									<span>Post as anonymous</span>
									<InfoHover text="Your account information will be hidden from all users except you" />
								</div>
							}
							control={
								<Checkbox
									{...register('anonymous')}
								/>
							}
						/>
					</div>
					<div className="form-buttons">
						<Button
							type="button"
							disabled={isFormLoading}
							onClick={() =>
								navigate(ROUTES.forum)
							}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={isFormLoading}
						>
							Create
						</Button>
					</div>
				</form>
			</div>
		</ForumPostNewStyle>
	);
};

export default ForumPostNew;

export namespace NForumPostNew {
	export interface IForm {
		title: string;
		content: Descendant[];
		public: boolean;
		anonymous: boolean;
	}
}

const ForumPostNewStyle = styled.div`
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

	.new-forum-post-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.heading {
			text-align: center;
			margin-bottom: 24px;
		}
		.new-forum-post-content {
			background-color: ${({ theme }) =>
				theme?.palette?.background_2?.default};
			padding: 12px;
			border-radius: 5px;
			max-width: 800px;
			box-sizing: border-box;
			width: 100%;
			min-height: 200px;
			display: flex;
			flex-direction: column;
			.new-forum-post-fields {
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				row-gap: 12px;
				> * {
					width: 100%;
				}
			}
			.form-buttons {
				width: 100%;
				display: flex;
				justify-content: flex-end;
			}
		}
	}

	.input-markdown {
		min-height: 100px;
	}

	${CSSMediaSize.phone_big} {
		padding: 20px 10px;
	}
`;
