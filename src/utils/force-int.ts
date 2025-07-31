export default (value: string) => {
	return /^\d+$/.test(value.trim())
		? Number(value)
		: 0;
};
