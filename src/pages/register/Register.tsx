import styled from 'styled-components';
import React from 'react';
import {
	Button,
	ButtonBase,
	Checkbox,
	FormControlLabel,
	FormHelperText,
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
import { CSSMediaSize } from '../../const';
import {
	Guide,
	NGuide,
} from '../../components/guide';

const guidePath: NGuide.IGuidePathItem[] = [
	{
		name: 'Home',
		route: ROUTES.home,
	},
	{
		name: 'Register',
		route: ROUTES.register,
	},
];

const getDefaultForm = (): NRegister.IForm => {
	return {
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
		agreeTosPp: false,
		agreeAge: false,
		// claimKey: '',
	};
};

const Register = () => {
	const navigate = useNavigate();

	const [success, setSuccess] =
		React.useState(false);
	const [showPassword, setShowPassword] =
		React.useState(false);
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
			isSubmitting: isFormSubmitting,
			errors: formErrors,
		},
		reset: resetForm,
	} = useForm<NRegister.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			try {
				const token = await executeRecaptcha?.(
					'register',
				);

				if (token) {
					const resp = await axios.post(
						API_ROUTES.register,
						{
							...omit(values, [
								'repeatPassword',
								'agreeTosPp',
								'agreeAge',
							]),
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
		},
	);

	const onResendVerification = () => {
		navigate(ROUTES.resendVerification);
	};

	const onGoLogin = () => {
		navigate(ROUTES.login);
	};

	const openLink = (
		e: React.MouseEvent,
		url: string,
	) => {
		e.stopPropagation();
		window.open(`#${url}`, '_blank');
	};

	return (
		<RegisterStyle>
			<Guide path={guidePath} />
			<div className="register-container">
				{!success ? (
					<div className="register-box">
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
											!!formErrors.username
												?.message
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
											!!formErrors.password
												?.message
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
														size="small"
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
															<VisibilityIcon fontSize="small" />
														) : (
															<VisibilityOffIcon fontSize="small" />
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
											...register(
												'repeatPassword',
											),
											endAdornment: (
												<InputAdornment position="end">
													<IconButton
														size="small"
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
															<VisibilityIcon fontSize="small" />
														) : (
															<VisibilityOffIcon fontSize="small" />
														)}
													</IconButton>
												</InputAdornment>
											),
										}}
									/>
								</div>
								{/* <div className="row">
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
							</div> */}
								<div className="row">
									<FormControlLabel
										className="checkbox-agree-tos-pp"
										label={
											<span>
												I agree to{' '}
												<span
													className="text-button"
													onClick={(e) =>
														openLink(
															e,
															ROUTES.termsOfService,
														)
													}
												>
													Terms of Service
												</span>{' '}
												and{' '}
												<span
													className="text-button"
													onClick={(e) =>
														openLink(
															e,
															ROUTES.privacyPolicy,
														)
													}
												>
													Privacy Policy
												</span>
											</span>
										}
										control={
											<Checkbox
												{...register(
													'agreeTosPp',
												)}
											/>
										}
									/>
									{formErrors.agreeTosPp ? (
										<FormHelperText error>
											{
												formErrors.agreeTosPp
													?.message
											}
										</FormHelperText>
									) : null}
									<FormControlLabel
										className="checkbox-agree-tos-pp"
										label="I am at least 18 years old"
										control={
											<Checkbox
												{...register('agreeAge')}
											/>
										}
									/>
									{formErrors.agreeAge ? (
										<FormHelperText error>
											{
												formErrors.agreeAge
													?.message
											}
										</FormHelperText>
									) : null}
								</div>
								<div className="row">
									<ButtonBase
										disableRipple
										onClick={onResendVerification}
									>
										Resend verification link
									</ButtonBase>
								</div>
								<div className="row">
									<ButtonBase
										disableRipple
										onClick={onGoLogin}
									>
										Have an account? Log in!
									</ButtonBase>
								</div>
							</div>
							<div className="buttons">
								<Button
									type="submit"
									disabled={isFormSubmitting}
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
			</div>
		</RegisterStyle>
	);
};

export namespace NRegister {
	export interface IForm {
		username: string;
		email: string;
		password: string;
		repeatPassword: string;
		agreeTosPp: boolean;
		agreeAge: boolean;
		// claimKey: string;
	}
}

export default Register;

const RegisterStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	display: flex;
	flex-direction: column;

	.register-container {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		.register-box {
			background-color: ${({ theme }) =>
				theme?.palette?.background_2?.default};
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
	}

	.text-button {
		cursor: pointer;
		&:hover {
			color: ${({ theme }) =>
				theme?.palette?.primary?.main};
			text-decoration: underline;
		}
	}

	.MuiButtonBase-root {
		&:hover {
			text-decoration: underline;
		}
	}

	.small-info {
		font-size: 12px;
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
	}

	.register-success-container {
		text-align: center;
	}

	${CSSMediaSize.tablet} {
		padding: 20px 20px;
	}
`;
