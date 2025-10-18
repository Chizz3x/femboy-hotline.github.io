import { store } from '../store';
import {
	fetchUser,
	logout,
} from '../slices/user';

export default function userLifecycle() {
	if (
		localStorage.getItem('token') &&
		localStorage.getItem('uniqueId')
	)
		store.dispatch(fetchUser());

	window.addEventListener('storage', (e) => {
		if (
			e.key === 'token' ||
			e.key === 'uniqueId'
		) {
			const token = localStorage.getItem('token');
			const uniqueId =
				localStorage.getItem('uniqueId');
			if (token && uniqueId) {
				store.dispatch(fetchUser());
			} else {
				store.dispatch(logout());
			}
		}
	});
}
