import { Descendant } from 'slate';

export const slateToPlainText = (
	nodes: Descendant[],
): string => {
	return nodes
		.map((node) => slateToPlainRecursive(node))
		.join('\n');
};

const slateToPlainRecursive = (
	node: Descendant,
): string => {
	if ('text' in node) {
		return node.text;
	}

	return node.children
		.map(slateToPlainRecursive)
		.join('');
};
