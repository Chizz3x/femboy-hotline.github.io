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

	const unsubscribe = store.subscribe(() => {
		const state = store.getState();
		const newUserId =
			state.user.user?._id ?? null;

		if (newUserId && newUserId !== lastUserId) {
			cleanup();
			lastUserId = newUserId;
			initializePusher(newUserId);
		} else if (!newUserId && lastUserId) {
			cleanup();
		}
	});

	const initialUserId =
		store.getState().user.user?._id ?? null;
	if (initialUserId) {
		lastUserId = initialUserId;
		initializePusher(initialUserId);
	}

	return cleanup;
}
