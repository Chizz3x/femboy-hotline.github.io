export const countryCodeToCodepoint = (
	code: string,
) => {
	return code
		.toUpperCase()
		.split('')
		.map((c) =>
			(c.charCodeAt(0) + 127397).toString(16),
		)
		.join('-');
};
