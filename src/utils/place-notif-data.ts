export default (
	template: React.ReactNode,
	data: Record<string, any>,
) => {
	if (typeof template !== 'string')
		return template;

	return template.replace(
		/{{\s*(\w+)\s*}}/g,
		(_, key) => {
			if (!(key in data)) return `{{${key}}}`;

			return String(data[key])
				.replace(/{{/g, '{ {')
				.replace(/}}/g, '} }');
		},
	);
};
