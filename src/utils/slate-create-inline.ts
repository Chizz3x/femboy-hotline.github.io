const inner =
	/(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/
		.source;
export default (pattern: string) => {
	pattern = pattern.replace(/<inner>/g, () => {
		return inner;
	});
	return RegExp(
		`${
			/((?:^|[^\\])(?:\\{2})*)/.source
		}(?:${pattern})`,
	);
};
