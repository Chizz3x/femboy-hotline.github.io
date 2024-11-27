import * as yup from 'yup';
import requiredMessage from '../../utils/requiredMessage';
import { NResetPassword } from './ResetPassword';

export default () => {
	return yup.object<NResetPassword.IForm>({
		password: yup
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
			),
		repeatPassword: yup
			.string()
			.trim()
			.required(
				requiredMessage('Matching password'),
			)
			.oneOf(
				[yup.ref('password')],
				'Passwords must match',
			),
	});
};
