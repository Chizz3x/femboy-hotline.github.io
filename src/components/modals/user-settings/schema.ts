import * as yup from 'yup';
import { NModalUserSettings } from './user-settings';
import requiredMessage from '../../../utils/requiredMessage';

export default () => {
	return yup.object<NModalUserSettings.IForm>({
		email: yup
			.string()
			.trim()
			.email(
				'Email must be a valid email address',
			)
			.required(requiredMessage('Email'))
			.min(
				6,
				'Email must be at least 6 characters long',
			)
			.max(
				128,
				'Email must be at most 128 characters long',
			),
		username: yup
			.string()
			.trim()
			.required(requiredMessage('Username'))
			.min(
				1,
				'Username must be at least 1 character long',
			)
			.max(
				32,
				'Username must be at most 32 characters long',
			)
			.matches(
				/^[a-z0-9._-]+$/,
				'Only lowercase letters, dashes (-), underscores (_), and periods (.) are allowed',
			),
		currentPassword: yup
			.string()
			.trim()
			.required(requiredMessage('Password'))
			.min(
				6,
				'Email must be at least 6 characters long',
			)
			.max(
				128,
				'Email must be at most 128 characters long',
			)
			.matches(
				/\d/,
				'Password must contain at least one number',
			),
		newPassword: yup
			.string()
			.trim()
			.required(requiredMessage('Password'))
			.min(
				6,
				'Email must be at least 6 characters long',
			)
			.max(
				128,
				'Email must be at most 128 characters long',
			)
			.matches(
				/\d/,
				'Password must contain at least one number',
			),
		repeatPassword: yup
			.string()
			.trim()
			.required(
				requiredMessage('Matching password'),
			)
			.oneOf(
				[yup.ref('newPassword')],
				'Passwords must match',
			),
	});
};
