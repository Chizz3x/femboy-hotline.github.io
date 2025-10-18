import {
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { API_ROUTES } from '../../../routes';
import { Auth } from '../../../utils/auth';
import { getUniqueId } from '../../../scripts/unique-id-manager';

interface NotificationsState {
	notifs: any[];
	total: number;
	totalUnread: number;
	loading: boolean;
	error: string | null;
}

const initialState: NotificationsState = {
	notifs: [],
	total: 0,
	totalUnread: 0,
	loading: false,
	error: null,
};

export const fetchNotifications =
	createAsyncThunk(
		'notifications/fetchNotifications',
		async () => {
			const res = await axios.get(
				API_ROUTES.getNotifs,
				{
					params: { limit: 10 },
					headers: {
						Authorization: `Bearer ${Auth.getToken()}`,
						uniqueId: getUniqueId(),
					},
				},
			);
			if (res.status !== StatusCodes.OK)
				throw new Error(
					'Failed to fetch notifications',
				);
			return res.data?.data || null;
		},
	);

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		clearNotifications(state) {
			state.notifs = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchNotifications.pending,
				(state) => {
					state.loading = true;
					state.error = null;
				},
			)
			.addCase(
				fetchNotifications.fulfilled,
				(state, action) => {
					state.notifs =
						action.payload?.notifs || [];
					state.total =
						action.payload?.total || 0;
					state.totalUnread =
						action.payload?.totalUnread || 0;
					state.loading = false;
				},
			)
			.addCase(
				fetchNotifications.rejected,
				(state, action) => {
					state.loading = false;
					state.error =
						action.error.message ||
						'Error fetching notifications';
				},
			);
	},
});

export const { clearNotifications } =
	notificationsSlice.actions;
