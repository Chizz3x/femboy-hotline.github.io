import { Descendant } from 'slate';

export default (value?: Descendant[]) => {
	if (!value || !value.length) return value;

	let startIdx = 0;
	let endIdx = value.length - 1;

	while (startIdx <= endIdx) {
		const v = value[startIdx];
		if (
			'children' in v && 'text' in v.children[0]
				? !!v.children[0].text.trim()
				: false
		)
			break;
		startIdx++;
	}

	if (startIdx > endIdx) return [];
	if (endIdx === 0)
		return value.slice(startIdx, 1);

	while (endIdx >= startIdx) {
		const v = value[endIdx];
		if (
			'children' in v && 'text' in v.children[0]
				? !!v.children[0].text.trim()
				: false
		)
			break;
		endIdx--;
	}

	if (startIdx > endIdx) return [];

	return value.slice(startIdx, endIdx + 1);
};
