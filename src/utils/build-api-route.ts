import replaceUrlParts from './replace-url-parts';

const buildApiRoute = (
	url: string,
	params?: Record<string, any>,
) => {
	const { computedUrl, paramString } =
		replaceUrlParts(url, params);

	return new URL(
		computedUrl + paramString,
	).toString();
};

export default buildApiRoute;
