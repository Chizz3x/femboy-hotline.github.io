import { Button, TextField } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import yupValidationResolver from '../../utils/yupValidationResolver';
import schema from './schema';
import { InputMarkdown } from '../../components/inputs/markdown';
import { CustomEditor } from '../../types/overrides/slate';
import trimSlateValue from '../../utils/trim-slate-value';

const getDefaultForm =
	(): NForumPostNew.IForm => {
		return {
			title: '',
			// content
		};
	};

const ForumPostNew = () => {
	const [editor, setEditor] =
		React.useState<CustomEditor | null>(null);

	const {
		register,
		handleSubmit,
		formState: {
			isLoading: isFormLoading,
			errors: formErrors,
		},
		reset: resetForm,
	} = useForm<NForumPostNew.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			const content = editor?.children;
			console.log(values);
			console.log(trimSlateValue(content));
		},
	);

	return (
		<ForumPostNewStyle>
			<div className="new-forum-post-container">
				<div className="heading">
					<h2>Create new post</h2>
				</div>
				<form
					className="new-forum-post-content"
					onSubmit={onSubmit}
				>
					<div className="new-forum-post-fields">
						<TextField
							label="Title"
							size="small"
							required
							inputProps={{
								...register('title'),
							}}
						/>
						<InputMarkdown
							props={{
								editable: true,
								editableProps: {
									placeholder:
										'Your post content',
								},
								getEditor: (commentEditor) =>
									setEditor(commentEditor),
							}}
						/>
					</div>
					<div className="form-buttons">
						<Button>Cancel</Button>
						<Button type="submit">Create</Button>
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
		// content
	}
}

const ForumPostNewStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	padding: 20px 50px;

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
			background-color: var(--c-p2);
			padding: 12px;
			border-radius: 5px;
			max-width: 800px;
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
`;
