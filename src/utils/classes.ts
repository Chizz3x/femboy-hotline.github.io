export default (...classes: any[]) => {
	return classes
		.filter((f) => typeof f === 'string' && !!f)
		.map((m) => m.trim())
		.join(' ');
};
