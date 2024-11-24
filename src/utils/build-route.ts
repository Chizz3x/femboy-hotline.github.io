const buildRoute = (
	url: string,
	base?: string,
	params?: Record<string, any>,
) => {
	let computedUrl = url;
	let paramString = '';
	if (params) {
		const paramCopy = { ...params };
		const urlParts = computedUrl.split('/');
		for (const part of urlParts) {
			if (part.startsWith(':')) {
				const partName = part.slice(1);
				if (partName in params) {
					computedUrl = computedUrl.replace(
						part,
						params[partName],
					);
					delete paramCopy[partName];
				}
			}
		}
		paramString = Object.entries(paramCopy)
			.map((m) => `${m[0]}=${m[1]}`)
			.join('&');
	}

	return new URL(
		computedUrl + paramString,
		base,
	).toString();
};

export default buildRoute;
