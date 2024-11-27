import * as yup from 'yup';
import requiredMessage from '../../utils/requiredMessage';
import { NResendVerification } from './ResendVerification';

export default () => {
	return yup.object<NResendVerification.IForm>({
		email: yup
			.string()
			.trim()
			.required(requiredMessage('Email')),
		password: yup
			.string()
			.trim()
			.required(requiredMessage('Password')),
	});
};
