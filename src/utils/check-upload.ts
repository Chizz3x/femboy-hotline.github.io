export default async (url: string) => {
	try {
		const response = await fetch(url, {
			method: 'HEAD',
		});
		return response.ok;
	} catch {
		return false;
	}
};
