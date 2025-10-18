import {
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getUniqueId } from '../../../scripts/unique-id-manager';
import { API_ROUTES } from '../../../routes';

interface UserState {
	user: any | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
};

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (_, thunkAPI) => {
		const token = localStorage.getItem('token');
		if (!token)
			throw new Error('No auth token found');
		const uniqueId = getUniqueId();
		if (!uniqueId)
			throw new Error('No unique ID found');

		const res = await axios.post(
			API_ROUTES.getMe,
			undefined,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					uniqueId,
				},
			},
		);

		if (res.status !== StatusCodes.CREATED)
			throw new Error('Failed to fetch user');
		return res?.data?.data?.user || null;
	},
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// logout
		logout: (state) => {
			state.user = null;
		},
	},
	// login and fetch user
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(
				fetchUser.fulfilled,
				(state, action) => {
					state.user = action.payload;
					state.loading = false;
				},
			)
			.addCase(
				fetchUser.rejected,
				(state, action) => {
					state.loading = false;
					state.error =
						action.error.message ??
						'Failed to load user';
					state.user = null;
				},
			);
	},
});

export const { logout } = userSlice.actions;
