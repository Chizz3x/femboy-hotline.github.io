import styled from 'styled-components';
import React from 'react';
import {
	Button,
	ButtonBase,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { API_ROUTES, ROUTES } from '../../routes';
import omit from '../../utils/omit';
import yupValidationResolver from '../../utils/yupValidationResolver';
import schema from './schema';
import {
	CSSMediaSize,
	DISCORD_INVITE,
} from '../../const';

const getDefaultForm = (): NRegister.IForm => {
	return {
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
		claimKey: '',
	};
};

const Register = () => {
	const navigate = useNavigate();

	const [success, setSuccess] =
		React.useState(false);
	const [showPassword, setShowPassword] =
		React.useState(false);
	const [registering, setRegistering] =
		React.useState<boolean>(false);
	const [
		showRepeatPassword,
		setShowRepeatPassword,
	] = React.useState(false);

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
	} = useForm<NRegister.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			setRegistering(true);

			try {
				const token = await executeRecaptcha?.(
					'register',
				);

				if (token) {
					const resp = await axios.post(
						API_ROUTES.register,
						{
							...omit(values, ['repeatPassword']),
						},
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
						setSuccess(true);
					} else throw Error(resp?.data?.message);
				}
			} catch (error: any) {
				console.error(error);
				toast(error.message || 'Unknown error', {
					type: 'error',
				});
			}

			setRegistering(false);
		},
	);

	const onResendVerification = () => {
		navigate(ROUTES.resendVerification);
	};

	return (
		<RegisterStyle>
			{!success ? (
				<div className="register-container">
					<h2>Register</h2>
					<form
						className="register-form"
						onSubmit={onSubmit}
					>
						<div className="fields">
							<div className="row">
								<TextField
									helperText={
										formErrors.username?.message
									}
									error={
										!!formErrors.username?.message
									}
									size="small"
									label="Username"
									inputProps={{
										...register('username'),
									}}
								/>
							</div>
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
							<div className="row">
								<TextField
									helperText={
										formErrors.repeatPassword
											?.message
									}
									error={
										!!formErrors.repeatPassword
											?.message
									}
									size="small"
									label="Repeat password"
									type={
										showRepeatPassword
											? 'text'
											: 'password'
									}
									InputProps={{
										...register('repeatPassword'),
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={() =>
														setShowRepeatPassword(
															(v) => !v,
														)
													}
													onMouseDown={() =>
														setShowRepeatPassword(
															(v) => !v,
														)
													}
												>
													{showRepeatPassword ? (
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
							<div className="row">
								<span className="small-info">
									If you do not have the key, one
									can be obtained by joining our{' '}
									<a
										target="_blank"
										href={DISCORD_INVITE}
										rel="noreferrer"
									>
										Discord
									</a>{' '}
									and asking to enlist in testing.
								</span>
								<TextField
									helperText={
										formErrors.claimKey?.message
									}
									error={
										!!formErrors.claimKey?.message
									}
									size="small"
									label="Key"
									inputProps={{
										...register('claimKey'),
									}}
								/>
							</div>
							<div className="row">
								<ButtonBase
									disableRipple
									onClick={onResendVerification}
								>
									Resend verification link
								</ButtonBase>
							</div>
						</div>
						<div className="buttons">
							<Button
								type="submit"
								disabled={
									isFormLoading || registering
								}
							>
								Register
							</Button>
						</div>
					</form>
				</div>
			) : (
				<div className="register-success-container">
					<h2>
						Success, You are one step away from
						completing your registration!
					</h2>
					<span>
						Please close this window and check
						your email inbox for further steps
					</span>
				</div>
			)}
		</RegisterStyle>
	);
};

export namespace NRegister {
	export interface IForm {
		username: string;
		email: string;
		password: string;
		repeatPassword: string;
		claimKey: string;
	}
}

export default Register;

const RegisterStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	display: flex;
	align-items: center;
	justify-content: center;

	.small-info {
		font-size: 12px;
		color: var(--c-p6);
	}

	.register-container {
		background-color: var(--c-p2);
		padding: 20px 30px;
		border-radius: 10px;
		width: 100%;
		max-width: 500px;

		.register-form {
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

	.register-success-container {
		text-align: center;
	}

	${CSSMediaSize.tablet} {
		padding: 20px 20px;
	}
`;
