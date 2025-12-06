import * as yup from 'yup';
import { NForum } from './Forum';

export const sortOptions = [
	{
		label: 'Date Created',
		value: 'date_created',
	},
	{ label: 'Title', value: 'title' },
	{ label: 'Author Name', value: 'author_name' },
	{ label: 'Votes', value: 'votes' },
	{ label: 'Comments', value: 'comments' },
];

export const filterPrivateOptions = [
	{ label: 'No', value: -1 },
	{ label: 'Any', value: 0 },
	{ label: 'Yes', value: 1 },
];

export default () => {
	return yup.object<NForum.IForm>({
		text: yup.string().trim(),
		sortBy: yup
			.mixed()
			.oneOf(sortOptions.map((o) => o.value)),
		sortOrder: yup.mixed().oneOf(['asc', 'desc']),
		filterPrivate: yup
			.number()
			.oneOf(
				filterPrivateOptions.map((o) => o.value),
			),
	});
};
