import * as yup from 'yup';
import { NForumPost } from './ForumPost';
import requiredMessage from '../../utils/requiredMessage';

export default () => {
	return yup.object<NForumPost.IFormPostComment>({
		content: yup
			.array()
			.label('Content')
			.min(1, requiredMessage('Content'))
			.required(),
		anonymous: yup
			.boolean()
			.label('Anonymous')
			.required(),
	});
};
