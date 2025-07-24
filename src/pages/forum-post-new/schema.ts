import * as yup from 'yup';
import { NForumPostNew } from './ForumPostNew';
import requiredMessage from '../../utils/requiredMessage';

export default () => {
	return yup.object<NForumPostNew.IForm>({
		title: yup
			.string()
			.label('Title')
			.max(64)
			.required(),
		content: yup
			.array()
			.label('Content')
			.min(1, requiredMessage('Content'))
			.required(),
		public: yup
			.boolean()
			.label('Public')
			.required(),
		anonymous: yup
			.boolean()
			.label('Anonymous')
			.required(),
	});
};
