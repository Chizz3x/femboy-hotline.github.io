import Pusher, { Channel } from 'pusher-js';
import { fetchNotifications } from '../slices/notifs';
import {
	PUSHER_CLUSTER,
	PUSHER_KEY,
} from '../../const';
import { API_ROUTES } from '../../routes';
import { getUniqueId } from '../../scripts/unique-id-manager';
import { Auth } from '../../utils/auth';
import { store } from '../store';

let pusher: Pusher | null = null;
let channel: Channel | null = null;
let lastUserId: string | null = null;

export default function notificationsLifecycle() {
	// Watch for user state changes
	let unsubscribe: (() => void) | null = null;

	const initializePusher = (userId: string) => {
		if (pusher) return;

		pusher = new Pusher(PUSHER_KEY, {
			cluster: PUSHER_CLUSTER,
			authEndpoint: API_ROUTES.authPusher,
			auth: {
				headers: {
					Authorization: `Bearer ${Auth.getToken()}`,
					uniqueId: getUniqueId(),
				},
			},
		});

		channel = pusher.subscribe(
			`private-user-${userId}`,
		);

		channel.bind('new-notification', () => {
			store.dispatch(fetchNotifications());
		});

		window.addEventListener(
			'beforeunload',
			cleanup,
		);

		store.dispatch(fetchNotifications());
	};

	const cleanup = () => {
		channel?.unbind_all();
		if (pusher && lastUserId) {
			pusher.unsubscribe(
				`private-user-${lastUserId}`,
			);
			pusher.disconnect();
		}
		channel = null;
		pusher = null;
		lastUserId = null;
	};

	// React to changes in Redux user state
	const currentUserId =
		store.getState().user.user?._id ?? null;

	if (currentUserId) {
		lastUserId = currentUserId;
		initializePusher(currentUserId);
	}

	unsubscribe = store.subscribe(() => {
		const state = store.getState();
		const { user } = state.user;
		const newUserId = user?._id ?? null;

		if (newUserId && newUserId !== lastUserId) {
			// user logged in or changed
			cleanup();
			lastUserId = newUserId;
			initializePusher(newUserId);
		} else if (!newUserId && lastUserId) {
			// user logged out
			cleanup();
		}
	});
}
