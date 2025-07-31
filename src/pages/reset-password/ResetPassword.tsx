import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import {
	useNavigate,
	useParams,
	useSearchParams,
} from 'react-router-dom';
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
import { API_ROUTES, ROUTES } from '../../routes';
import schema from './schema';
import yupValidationResolver from '../../utils/yupValidationResolver';
import { CSSMediaSize } from '../../const';
import omit from '../../utils/omit';

const getDefaultForm =
	(): NResetPassword.IForm => {
		return {
			password: '',
			repeatPassword: '',
		};
	};

const ResetPassword = () => {
	const [params] = useSearchParams();
	const navigate = useNavigate();
	const token = params.get('token');

	const [showPassword, setShowPassword] =
		React.useState(false);
	const [
		showRepeatPassword,
		setShowRepeatPassword,
	] = React.useState(false);

	const {
		register,
		handleSubmit,
		formState: {
			isLoading: isFormLoading,
			errors: formErrors,
		},
		reset: resetForm,
	} = useForm<NResetPassword.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			try {
				if (token) {
					const resp = await axios.post(
						API_ROUTES.resetPassword,
						{
							...omit(values, ['repeatPassword']),
							token,
						},
					);

					if (
						resp?.data?.statusCode ===
						StatusCodes.OK
					) {
						resetForm(getDefaultForm());
						navigate(ROUTES.login);
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
		<ResetPasswordStyle>
			<div className="reset-password-container">
				<h2>Reset password</h2>
				<form
					className="reset-password-form"
					onSubmit={onSubmit}
				>
					<div className="fields">
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
					</div>
					<div className="buttons">
						<Button
							type="submit"
							disabled={isFormLoading}
						>
							Reset
						</Button>
					</div>
				</form>
			</div>
		</ResetPasswordStyle>
	);
};

export default ResetPassword;

export namespace NResetPassword {
	export interface IForm {
		password: string;
		repeatPassword: string;
	}
}

const ResetPasswordStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	display: flex;
	align-items: center;
	justify-content: center;

	.reset-password-container {
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		padding: 20px 30px;
		border-radius: 10px;
		width: 100%;
		max-width: 500px;

		.reset-password-form {
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
