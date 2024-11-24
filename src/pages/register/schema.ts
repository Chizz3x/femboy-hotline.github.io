import * as yup from 'yup';
import { NRegister } from './Register';
import requiredMessage from '../../utils/requiredMessage';

export default () => {
	return yup.object<NRegister.IForm>({
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
			),
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
		claimKey: yup
			.string()
			.trim()
			.required(requiredMessage('Key')),
	});
};
