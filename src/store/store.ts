import { configureStore } from '@reduxjs/toolkit';
import {
	TypedUseSelectorHook,
	useDispatch as useDispatchDefault,
	useSelector as useSelectorDefault,
} from 'react-redux';
import { userSlice } from './slices/user';
import { IS_DEV } from '../const';
import userLifecycle from './lifecycles/user.lifecycle';
import notificationsLifecycle from './lifecycles/notifs.lifecycle';
import { notificationsSlice } from './slices/notifs';
import notifSubsLifecycle from './lifecycles/notif-subs.lifecycle';
import { notifSubsSlice } from './slices/notif-subs';

// import { modalsSlice } from './slices/modals';

export const store = configureStore({
	reducer: {
		// Add slices here
		[userSlice.name]: userSlice.reducer,
		[notificationsSlice.name]:
			notificationsSlice.reducer,
		[notifSubsSlice.name]: notifSubsSlice.reducer,
		// [modalsSlice.name]: modalsSlice.reducer,
	},
	devTools: IS_DEV,
});

export type RootState = ReturnType<
	typeof store.getState
>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch =
	useDispatchDefault;
export const useSelector: TypedUseSelectorHook<RootState> =
	useSelectorDefault;

userLifecycle();
notificationsLifecycle();
notifSubsLifecycle();
