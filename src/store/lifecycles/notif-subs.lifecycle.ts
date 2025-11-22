import { store } from '../store';
import { Auth } from '../../utils/auth';
import {
	clearNotifSubs,
	fetchNotifSubs,
} from '../slices/notif-subs';

export default function notifSubsLifecycle() {
	if (Auth.getToken())
		store.dispatch(fetchNotifSubs());

	window.addEventListener('storage', (e) => {
		if (
			e.key === 'token' ||
			e.key === 'uniqueId'
		) {
			const token = Auth.getToken();
			const uniqueId =
				localStorage.getItem('uniqueId');
			if (token && uniqueId) {
				store.dispatch(fetchNotifSubs());
			} else {
				store.dispatch(clearNotifSubs());
			}
		}
	});
}
