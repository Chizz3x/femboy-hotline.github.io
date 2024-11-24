import { v4 as uuid } from 'uuid';
import { localStorageSet } from '../utils/local-storage';

const uniqueIdManager = () => {
	if (!localStorage) return;

	if (!localStorage.getItem('uniqueId')) {
		const uid = uuid();
		localStorageSet('uniqueId', uid);
	}
};

const getUniqueId = () => {
	if (!localStorage) return '';

	let uid = localStorage.getItem('uniqueId');
	if (!uid) {
		uniqueIdManager();
		uid = localStorage.getItem('uniqueId');
	}

	return uid || '';
};

export default uniqueIdManager;
export { getUniqueId };
