export const sessionStorageSet = (
	key: string,
	value: string,
) => {
	sessionStorage.setItem(key, value);

	const event = new StorageEvent('storage', {
		key,
		newValue: value,
		storageArea: sessionStorage,
	});
	window.dispatchEvent(event);
};

export const sessionStorageRemove = (
	key: string,
) => {
	sessionStorage.removeItem(key);

	const event = new StorageEvent('storage', {
		key,
		storageArea: sessionStorage,
	});
	window.dispatchEvent(event);
};
