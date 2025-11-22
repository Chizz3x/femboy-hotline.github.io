import {
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { API_ROUTES } from '../../../routes';
import { Auth } from '../../../utils/auth';

interface NotifSubsState {
	subs: any | null;
	loading: boolean;
	error: string | null;
}

const initialState: NotifSubsState = {
	subs: null,
	loading: false,
	error: null,
};

export const fetchNotifSubs = createAsyncThunk(
	'notifs/fetchNotifSubs',
	async (_, thunkAPI) => {
		const token = Auth.getToken();
		if (!token)
			throw new Error('No auth token found');
		const uniqueId = getUniqueId();
		if (!uniqueId)
			throw new Error('No unique ID found');

		const res = await axios.get(
			API_ROUTES.getNotifSubs,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					uniqueId,
				},
			},
		);

		if (res.status !== StatusCodes.OK)
			throw new Error(
				'Failed to fetch notif subs',
			);
		return res?.data?.data?.subs || null;
	},
);

export const notifSubsSlice = createSlice({
	name: 'notifSubs',
	initialState,
	reducers: {
		clearNotifSubs: (state) => {
			state.subs = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				fetchNotifSubs.pending,
				(state) => {
					state.loading = true;
				},
			)
			.addCase(
				fetchNotifSubs.fulfilled,
				(state, action) => {
					state.subs = action.payload;
					state.loading = false;
				},
			)
			.addCase(
				fetchNotifSubs.rejected,
				(state, action) => {
					state.loading = false;
					state.error =
						action.error.message ??
						'Failed to load notif subs';
					state.subs = null;
				},
			);
	},
});

export const { clearNotifSubs } =
	notifSubsSlice.actions;
