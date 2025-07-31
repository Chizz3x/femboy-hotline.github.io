import React from 'react';
import {
	Controller,
	useForm,
} from 'react-hook-form';
import {
	Autocomplete,
	Button,
	IconButton,
	InputAdornment,
	TextField,
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import useAxios from 'axios-hooks';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import dayjs, {
	Dayjs,
} from '../../../utils/dayjs';
import classes from '../../../utils/classes';
import yupValidationResolver from '../../../utils/yupValidationResolver';
import userInfoSchema from './user-info-schema';
import { CountryFlag } from '../../../components/country-flag';
import {
	CODE_TO_NAME,
	COUNTRIES,
} from '../../../countries';
import { API_ROUTES } from '../../../routes';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { Auth } from '../../../utils/auth';
import { DatePicker } from '../../../components/inputs/date-picker';
import { changeModals } from '../../../components/modals/modals';

const getDefaultForm = (
	props?: Partial<NUserInfo.IForm>,
): NUserInfo.IForm => {
	return {
		gender: '',
		nationality: '',
		birthDate: null,
		...props,
	};
};

const nationalityOptions: NUserInfo.IOption[] =
	COUNTRIES.map((m) => ({
		label: (
			<span className="autocomplete-option">
				<CountryFlag code={m?.code} />
				{m?.name}
			</span>
		),
		stringLabel: m?.name,
		value: m?.code,
	}));

const UserInfo = (props: NUserInfo.IProps) => {
	const { user, ...rest } = props;

	const [editMode, setEditMode] =
		React.useState(false);

	const [, updateInfo] = useAxios(
		{
			method: 'POST',
			url: API_ROUTES.userUpdateInfo,
			headers: {
				Authorization: `Bearer ${Auth.getToken()}`,
				uniqueId: getUniqueId(),
			},
		},
		{ manual: true, autoCancel: true },
	);

	const {
		handleSubmit,
		control,
		formState: {
			isLoading: isFormLoading,
			errors: formErrors,
		},
		reset: resetForm,
	} = useForm<NUserInfo.IForm>({
		resolver: yupValidationResolver(
			userInfoSchema(),
		),
		defaultValues: getDefaultForm(),
	});

	const onSubmit = handleSubmit(
		async (values) => {
			try {
				await updateInfo({
					data: values,
				});
				Auth.check();
			} catch (err) {
				toast('Failed to update info', {
					type: 'error',
				});
			}
			setEditMode(false);
		},
	);

	const onClearAll = async () => {
		window.dispatchEvent(
			changeModals({
				ModalClearUserInfo: {
					open: true,
				},
			}),
		);
	};

	const startEdit = () => {
		setEditMode(true);
		const birthDate = dayjs(user.birthDate);
		resetForm(
			getDefaultForm({
				gender: user.gender || '',
				nationality: user.nationality || '',
				birthDate: birthDate.isValid()
					? birthDate
					: null,
			}),
		);
	};

	const endEdit = () => {
		setEditMode(false);
	};

	return (
		<UserInfoStyle
			{...rest}
			className={classes(
				'user-info-container',
				rest.className,
			)}
		>
			{editMode ? (
				<form onSubmit={onSubmit}>
					<table>
						<tbody>
							<tr>
								<th>Gender</th>
								<td>
									<Controller
										name="gender"
										control={control}
										render={({ field }) => (
											<TextField
												{...field}
												label="Gender"
												size="small"
												error={
													!!formErrors.gender
												}
												helperText={
													formErrors.gender
														?.message
												}
												InputProps={{
													endAdornment:
														field?.value && (
															<InputAdornment position="end">
																<IconButton
																	size="small"
																	onClick={() =>
																		field.onChange(
																			'',
																		)
																	}
																>
																	<ClearIcon fontSize="small" />
																</IconButton>
															</InputAdornment>
														),
												}}
											/>
										)}
									/>
								</td>
							</tr>
							<tr>
								<th>Nationality</th>
								<td>
									<Controller
										name="nationality"
										control={control}
										render={({ field }) => (
											<Autocomplete<NUserInfo.IOption>
												{...field}
												value={
													nationalityOptions.find(
														(f) =>
															f.value ===
															field.value,
													) || null
												}
												onChange={(_, v) =>
													field.onChange(
														v?.value || '',
													)
												}
												disablePortal
												options={
													nationalityOptions
												}
												getOptionLabel={(
													option,
												) => option?.stringLabel}
												renderOption={(
													_props,
													option,
												) => (
													<li
														{..._props}
														key={option.value}
													>
														{option?.label}
													</li>
												)}
												size="small"
												renderInput={(params) => (
													<TextField
														{...params}
														error={
															!!formErrors.nationality
														}
														helperText={
															formErrors
																.nationality
																?.message
														}
														InputProps={{
															...params.InputProps,
															startAdornment:
																field?.value ? (
																	<InputAdornment position="end">
																		<CountryFlag
																			code={
																				field?.value
																			}
																		/>
																	</InputAdornment>
																) : null,
														}}
														label="Nationality"
													/>
												)}
											/>
										)}
									/>
								</td>
							</tr>
							<tr>
								<th>Birth date</th>
								<td>
									<Controller
										name="birthDate"
										control={control}
										render={({ field }) => (
											<DatePicker
												tabs={['year', 'date']}
												previewFormat="YYYY-MM-DD"
												displayFormat="YYYY-MM-DD"
												fieldProps={{
													size: 'small',
													label: 'Birth date',
													error:
														!!formErrors.birthDate,
													helperText:
														formErrors.birthDate
															?.message,
												}}
												controlled
												onChange={(v) =>
													field.onChange(v)
												}
												value={field.value}
												clearable
											/>
										)}
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<div className="user-info-buttons">
						<Button
							disabled={isFormLoading}
							onClick={() => endEdit()}
						>
							Cancel
						</Button>
						<Button
							disabled={isFormLoading}
							type="submit"
						>
							Save
						</Button>
					</div>
				</form>
			) : (
				<>
					<table>
						<tbody>
							<tr>
								<th>Gender</th>
								<td>{user?.gender || '-'}</td>
							</tr>
							<tr>
								<th>Nationality</th>
								<td>
									<div className="align-middle">
										{user?.nationality ? (
											<>
												<CountryFlag
													code={user?.nationality}
													height={21}
												/>
												{CODE_TO_NAME.get(
													user?.nationality,
												)}
											</>
										) : (
											'-'
										)}
									</div>
								</td>
							</tr>
							<tr>
								<th>Age</th>
								<td>
									{user?.birthDate
										? dayjs().diff(
												user?.birthDate,
												'year',
										  )
										: '-'}
								</td>
							</tr>
						</tbody>
					</table>
					<div className="user-info-buttons">
						<Button onClick={() => startEdit()}>
							Edit
						</Button>
						<Button onClick={onClearAll}>
							Clear all
						</Button>
					</div>
				</>
			)}
		</UserInfoStyle>
	);
};

export default UserInfo;

export namespace NUserInfo {
	export interface IProps
		extends React.HTMLAttributes<HTMLDivElement> {
		user: any;
	}
	export interface IForm {
		gender?: string;
		nationality?: string;
		birthDate?: Dayjs | null;
	}
	export interface IOption {
		label: JSX.Element | string;
		stringLabel: string;
		value: any;
	}
}

const UserInfoStyle = styled.div`
	background-color: ${({ theme }) =>
		theme?.palette?.background_2?.default};
	border-radius: 10px;
	padding: 20px 30px;
	table {
		max-width: 300px;
		text-align: left;
		border-spacing: 0 10px;
		td {
			padding-left: 14px;
		}
	}

	.user-info-buttons {
		margin-top: 10px;
		display: flex;
		column-gap: 10px;
	}

	.autocomplete-option {
		display: flex;
		align-items: center;
		column-gap: 5px;
	}

	.align-middle {
		display: flex;
		align-items: center;
		column-gap: 5px;
	}
`;
