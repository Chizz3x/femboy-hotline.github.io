import * as yup from 'yup';
import { NForgotPassword } from './ForgotPassword';
import requiredMessage from '../../utils/requiredMessage';

export default () => {
	return yup.object<NForgotPassword.IForm>({
		email: yup
			.string()
			.trim()
			.required(requiredMessage('Email')),
	});
};
