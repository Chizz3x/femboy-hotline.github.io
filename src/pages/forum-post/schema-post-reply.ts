import * as yup from 'yup';
import { NForumPost } from './ForumPost';
import requiredMessage from '../../utils/requiredMessage';
import { NCommentContainer } from './components/comments-container';

export default () => {
	return yup.object<NCommentContainer.IFormPostReply>(
		{
			content: yup
				.array()
				.label('Content')
				.min(1, requiredMessage('Content'))
				.required(),
			anonymous: yup
				.boolean()
				.label('Anonymous')
				.required(),
		},
	);
};
