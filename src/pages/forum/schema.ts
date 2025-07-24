import * as yup from 'yup';
import { NForum } from './Forum';

export default () => {
	return yup.object<NForum.IForm>({
		text: yup.string().trim(),
	});
};
