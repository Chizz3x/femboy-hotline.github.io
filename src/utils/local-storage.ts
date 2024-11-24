export const localStorageSet = (
	key: string,
	value: string,
) => {
	localStorage.setItem(key, value);

	const event = new StorageEvent('storage', {
		key,
		newValue: value,
		storageArea: localStorage,
	});
	window.dispatchEvent(event);
};

export const localStorageRemove = (
	key: string,
) => {
	localStorage.removeItem(key);

	const event = new StorageEvent('storage', {
		key,
		storageArea: localStorage,
	});
	window.dispatchEvent(event);
};
