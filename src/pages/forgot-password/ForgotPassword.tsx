import React from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { Button, TextField } from '@mui/material';
import yupValidationResolver from '../../utils/yupValidationResolver';
import schema from './schema';
import { API_ROUTES } from '../../routes';
import { CSSMediaSize } from '../../const';

const getDefaultForm =
	(): NForgotPassword.IForm => {
		return {
			email: '',
		};
	};

const ForgotPassword = () => {
	const { executeRecaptcha } =
		useGoogleReCaptcha();

	const {
		register,
		handleSubmit,
		formState: {
			isLoading: isFormLoading,
			errors: formErrors,
		},
		reset: resetForm,
	} = useForm<NForgotPassword.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			try {
				const token = await executeRecaptcha?.(
					'forgot_password',
				);

				if (token) {
					const resp = await axios.post(
						API_ROUTES.forgotPassword,
						values,
						{
							headers: {
								'grecaptcha-token': token,
							},
						},
					);

					if (
						resp?.data?.statusCode ===
						StatusCodes.OK
					) {
						resetForm(getDefaultForm());
						toast('Please check your email', {
							type: 'success',
						});
					} else throw Error(resp?.data?.message);
				} else
					throw Error('Google Recaptcha failed');
			} catch (error: any) {
				console.error(error);
				toast(error.message || 'Unknown error', {
					type: 'error',
				});
			}
		},
	);

	return (
		<ForgotPasswordStyle>
			<div className="forgot-password-container">
				<h2>Forgot password</h2>
				<form
					className="forgot-password-form"
					onSubmit={onSubmit}
				>
					<div className="fields">
						<div className="row">
							<TextField
								helperText={
									formErrors.email?.message
								}
								error={
									!!formErrors.email?.message
								}
								size="small"
								label="Email"
								inputProps={{
									...register('email'),
								}}
							/>
						</div>
					</div>
					<div className="buttons">
						<Button
							type="submit"
							disabled={isFormLoading}
						>
							Send
						</Button>
					</div>
				</form>
			</div>
		</ForgotPasswordStyle>
	);
};

export default ForgotPassword;

export namespace NForgotPassword {
	export interface IForm {
		email: string;
	}
}

const ForgotPasswordStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	display: flex;
	align-items: center;
	justify-content: center;

	.forgot-password-container {
		background-color: var(--c-p2);
		padding: 20px 30px;
		border-radius: 10px;
		width: 100%;
		max-width: 500px;

		.forgot-password-form {
			margin: 20px 0;

			.fields {
				.row {
					> .MuiTextField-root {
						width: 100%;
					}
					&:not(:last-child) {
						margin-bottom: 15px;
					}
				}
			}

			.buttons {
				margin-top: 20px;
				display: flex;
				justify-content: flex-end;
			}
		}
	}

	${CSSMediaSize.tablet} {
		padding: 20px 20px;
	}
`;
