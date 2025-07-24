import replaceUrlParts from './replace-url-parts';

const buildRoute = (
	url: string,
	params?: Record<string, any>,
) => {
	const { computedUrl, paramString } =
		replaceUrlParts(url, params);

	const newUrl = new URL(
		computedUrl + paramString,
		window.location.origin,
	);

	return newUrl.pathname + newUrl.search;
};

export default buildRoute;
