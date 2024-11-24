import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
	Button,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import {
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import yupValidationResolver from '../../utils/yupValidationResolver';
import schema from './schema';
import { CSSMediaSize } from '../../const';
import { API_ROUTES, ROUTES } from '../../routes';
import { getUniqueId } from '../../scripts/unique-id-manager';
import { Auth } from '../../utils/auth';

const getDefaultForm = (): NLogin.IForm => {
	return {
		usernameOrEmail: '',
		password: '',
		rememberMe: false,
	};
};

const Login = () => {
	const navigate = useNavigate();

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
	} = useForm<NLogin.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			try {
				const token = await executeRecaptcha?.(
					'login',
				);

				if (token) {
					const resp = await axios.post(
						API_ROUTES.login,
						{
							...values,
							uniqueId: getUniqueId(),
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
						Auth.setAuth(
							resp?.data?.data?.token,
							values.rememberMe,
						);
						navigate(ROUTES.home);
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
		<LoginStyle>
			<div className="login-container">
				<h2>Login</h2>
				<form
					className="login-form"
					onSubmit={onSubmit}
				>
					<div className="fields">
						<div className="row">
							<TextField
								helperText={
									formErrors.usernameOrEmail
										?.message
								}
								error={
									!!formErrors.usernameOrEmail
										?.message
								}
								size="small"
								label="Username or Email"
								inputProps={{
									...register('usernameOrEmail'),
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
							<FormControlLabel
								control={
									<Checkbox
										{...register('rememberMe')}
									/>
								}
								label="Remember me"
							/>
						</div>
					</div>
					<div className="buttons">
						<Button
							type="submit"
							disabled={isFormLoading}
						>
							Log in
						</Button>
					</div>
				</form>
			</div>
		</LoginStyle>
	);
};

export namespace NLogin {
	export interface IForm {
		usernameOrEmail: string;
		password: string;
		rememberMe: boolean;
	}
}

export default Login;

const LoginStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	display: flex;
	align-items: center;
	justify-content: center;

	.login-container {
		background-color: var(--c-p2);
		padding: 20px 30px;
		border-radius: 10px;
		width: 100%;
		max-width: 500px;

		.login-form {
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
