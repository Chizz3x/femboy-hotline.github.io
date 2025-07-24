import * as yup from 'yup';
import { NForumPost } from './ForumPost';
import requiredMessage from '../../utils/requiredMessage';

export default () => {
	return yup.object<NForumPost.IFormPostEdit>({
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
	});
};
