import * as yup from 'yup';
import { NForums } from './Forums';

export default () => {
	return yup.object<NForums.IForm>({
		text: yup.string().trim(),
	});
};
