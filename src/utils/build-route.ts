import replaceUrlParts from './replace-url-parts';

const buildRoute = (
	url: string,
	params?: Record<string, any>,
	addExtra = true,
) => {
	const { computedUrl, paramString } =
		replaceUrlParts(url, params);

	const newUrl = new URL(
		computedUrl + (addExtra ? paramString : ''),
		window.location.origin,
	);

	return newUrl.pathname + newUrl.search;
};

export default buildRoute;
