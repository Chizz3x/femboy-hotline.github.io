import React from 'react';
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
	Controller,
	useForm,
} from 'react-hook-form';
import {
	Visibility as VisibilityIcon,
	VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import useAxios from 'axios-hooks';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { changeModals, NModals } from '../modals';
import { ModalLayout } from '../layout';
import yupValidationResolver from '../../../utils/yupValidationResolver';
import schema from './schema';
import { useAuth } from '../../contexts/auth';
import {
	API_ROUTES,
	ROUTES,
} from '../../../routes';
import { Auth } from '../../../utils/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { InfoHover } from '../../info-hover';
import IconDiscord from '../../icons/icon-discord';
import {
	DISCORD_AUTH_REDIRECT,
	DISCORD_AUTH_SCOPE,
	DISCORD_CLIENT_ID,
} from '../../../const';

const getDefaultForm = (
	props?: Partial<NModalUserSettings.IForm>,
): NModalUserSettings.IForm => {
	return {
		email: '',
		username: '',
		unlisted: false,
		password: '',
		...props,
	};
};

const name = 'ModalUserSettings';
const Modal = (
	props: NModalUserSettings.IProps,
) => {
	const {
		authed,
		seed: authSeed,
		loaded: loadedAuth,
	} = useAuth();

	const navigate = useNavigate();

	const [{ data: meData }, getMe] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.getMe,
		},
		{ manual: true, autoCancel: true },
	);

	const [, updateUserSettings] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.updateUserSettings,
		},
		{ manual: true, autoCancel: true },
	);

	const { user: userData } = meData?.data || {};

	const [
		showCurrentPassword,
		setShowCurrentPassword,
	] = React.useState<boolean>(false);

	const closeModal = () => {
		window.dispatchEvent(
			changeModals({ [name]: null }),
		);
	};

	const {
		handleSubmit,
		formState: { errors: formErrors },
		register,
		reset: resetForm,
		control,
	} = useForm<NModalUserSettings.IForm>({
		resolver: yupValidationResolver(schema()),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			const resp = await updateUserSettings({
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					uniqueId: getUniqueId(),
				},
				data: {
					...values,
				},
			});

			if (resp?.data?.data?.success) {
				toast('Settings updated', {
					type: 'success',
				});
				Auth.check();
			}
		},
	);

	const doConnect = (type: 'discord') => {
		switch (type) {
			case 'discord': {
				window.location.href = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${DISCORD_AUTH_REDIRECT}&scope=${DISCORD_AUTH_SCOPE}&state=${getUniqueId()}`;
				break;
			}
			default:
				break;
		}
	};

	const doDisconnect = async (
		type: 'discord',
	) => {
		switch (type) {
			case 'discord': {
				try {
					await axios.post(
						API_ROUTES.authDiscordDisconnect,
						undefined,
						{
							headers: {
								Authorization: `Bearer ${Auth.getToken()}`,
								uniqueId: getUniqueId(),
							},
						},
					);
				} catch (err) {
					console.error('Something went wrong');
				}
				Auth.check();
				break;
			}
			default:
				break;
		}
	};

	const goResetPassword = () => {
		navigate(ROUTES.resetPassword);
		closeModal();
	};

	React.useEffect(() => {
		(async () => {
			if (authed) {
				const res = await getMe({
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				});
				if (res?.data?.data?.user) {
					resetForm(
						getDefaultForm({
							email:
								res?.data?.data?.user?.email ||
								'',
							username:
								res?.data?.data?.user?.username ||
								'',
							unlisted:
								res?.data?.data?.user
									?.unlisted_profile || false,
						}),
					);
				}
			}
		})();
	}, [authed, authSeed]);

	return (
		<ModalLayout
			{...props}
			showHeader
			hideCloseButton
			title="Settings"
			name={name}
			width="500px"
		>
			<ModalUserSettingsStyle>
				<form>
					<div className="form-body">
						<div className="form-generic">
							<h3>Generic</h3>
							<Controller
								name="email"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										helperText={
											formErrors.email?.message
										}
										error={
											!!formErrors.email?.message
										}
										size="small"
										label="Email"
									/>
								)}
							/>
							<Controller
								name="username"
								control={control}
								render={({ field }) => (
									<TextField
										{...field}
										helperText={
											formErrors.username?.message
										}
										error={
											!!formErrors.username
												?.message
										}
										size="small"
										label="Username"
									/>
								)}
							/>
						</div>
						<div className="form-privacy">
							<h3>Privacy</h3>
							<div className="privacy-rows">
								<Controller
									name="unlisted"
									control={control}
									render={({ field }) => (
										<FormControlLabel
											label={
												<div className="checkbox-label">
													<span>
														Unlisted profile
													</span>
													<InfoHover text="Whether your profile should be unlisted from public lists. This does not hide your profile." />
												</div>
											}
											control={
												<Checkbox
													{...register(
														'unlisted',
													)}
													checked={field.value}
												/>
											}
										/>
									)}
								/>
							</div>
						</div>
						<div className="form-connections">
							<h3>Connections</h3>
							<div className="connection-buttons">
								<div className="connection-row">
									<h4>
										<IconDiscord /> Discord
										{userData?.discord ? (
											<span className="user-discord-username">
												{
													userData?.discord
														?.username
												}
											</span>
										) : null}
									</h4>
									<div className="connection-row-buttons">
										<Button
											size="small"
											onClick={() =>
												doConnect('discord')
											}
										>
											{userData?.discord
												? 'Update'
												: 'Connect'}
										</Button>
										<Button
											size="small"
											disabled={
												!userData?.discord
											}
											onClick={() =>
												doDisconnect('discord')
											}
										>
											Disconnect
										</Button>
									</div>
								</div>
							</div>
						</div>
						<div className="form-security">
							<h3>Security</h3>
							<div className="security-buttons">
								<Button onClick={goResetPassword}>
									Reset password
								</Button>
							</div>
						</div>
						<div className="non-form">
							<h3>Confirm</h3>
							<TextField
								helperText={
									formErrors.password?.message
								}
								error={
									!!formErrors.password?.message
								}
								size="small"
								label="Current password"
								type={
									showCurrentPassword
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
													setShowCurrentPassword(
														(v) => !v,
													)
												}
												onMouseDown={() =>
													setShowCurrentPassword(
														(v) => !v,
													)
												}
											>
												{showCurrentPassword ? (
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
					</div>
					<div className="buttons">
						<Button onClick={closeModal}>
							Close
						</Button>
						<Button onClick={onSubmit}>
							Save
						</Button>
					</div>
				</form>
			</ModalUserSettingsStyle>
		</ModalLayout>
	);
};

export { name, Modal };

export namespace NModalUserSettings {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps
		extends NModals.IDefaultProps {
		//
	}

	export interface IForm {
		email: string;
		username: string;
		unlisted: boolean;
		password: string;
	}
}

const ModalUserSettingsStyle = styled.div`
	.form-body {
		display: flex;
		flex-direction: column;
		row-gap: 15px;
		> * {
			display: flex;
			flex-direction: column;
			row-gap: 10px;
		}
	}
	.user-discord-username {
		margin-left: 5px;
		font-size: 12px;
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
	}
	.connection-buttons {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}
	.connection-row {
		> h4 {
			margin-bottom: 5px;
		}
		.connection-row-buttons {
			display: flex;
			column-gap: 5px;
		}
	}
	.checkbox-label {
		display: flex;
		align-items: center;
		column-gap: 5px;
	}
	.buttons {
		margin-top: 10px;
		display: flex;
		justify-content: flex-end;
	}
`;
