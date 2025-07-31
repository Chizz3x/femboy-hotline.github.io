import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import {
	Button,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import {
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { API_ROUTES } from '../../routes';
import schema from './schema';
import yupValidationResolver from '../../utils/yupValidationResolver';
import { CSSMediaSize } from '../../const';

const getDefaultForm =
	(): NResendVerification.IForm => {
		return {
			email: '',
			password: '',
		};
	};

const ResendVerification = () => {
	const [showPassword, setShowPassword] =
		React.useState(false);

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
	} = useForm<NResendVerification.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			try {
				const token = await executeRecaptcha?.(
					'resend_verification',
				);

				if (token) {
					const resp = await axios.post(
						API_ROUTES.resendVerification,
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
				}
			} catch (error: any) {
				console.error(error);
				toast(error.message || 'Unknown error', {
					type: 'error',
				});
			}
		},
	);

	return (
		<ResendVerificationStyle>
			<div className="resend-verification-container">
				<h2>Resend verification</h2>
				<span>
					Use this page to resend verification
					link if by any chance you have not
					received it after registration.
				</span>
				<form
					className="resend-verification-form"
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
						<div className="row">
							<TextField
								helperText={
									formErrors.password?.message
								}
								error={
									!!formErrors.password?.message
								}
								size="small"
								label="Password"
								type={
									showPassword
										? 'text'
										: 'password'
								}
								InputProps={{
									...register('password'),
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={() =>
													setShowPassword(
														(v) => !v,
													)
												}
												onMouseDown={() =>
													setShowPassword(
														(v) => !v,
													)
												}
											>
												{showPassword ? (
													<VisibilityIcon />
												) : (
													<VisibilityOffIcon />
												)}
											</IconButton>
										</InputAdornment>
									),
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
		</ResendVerificationStyle>
	);
};

export namespace NResendVerification {
	export interface IForm {
		email: string;
		password: string;
	}
}

export default ResendVerification;

const ResendVerificationStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	display: flex;
	align-items: center;
	justify-content: center;

	.resend-verification-container {
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		padding: 20px 30px;
		border-radius: 10px;
		width: 100%;
		max-width: 500px;

		.resend-verification-form {
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
