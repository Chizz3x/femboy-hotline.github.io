import * as yup from 'yup';
import { NForumPostNew } from './ForumPostNew';
import requiredMessage from '../../utils/requiredMessage';

export default () => {
	return yup.object<NForumPostNew.IForm>({
		title: yup.string().required(requiredMessage),
		// content
	});
};
