import * as yup from 'yup';
import { NLogin } from './Login';
import requiredMessage from '../../utils/requiredMessage';

export default () => {
	return yup.object<NLogin.IForm>({
		usernameOrEmail: yup
			.string()
			.trim()
			.required(
				requiredMessage('Username or email'),
			),
		password: yup
			.string()
			.trim()
			.required(requiredMessage('Password')),
		rememberMe: yup.boolean(),
	});
};
