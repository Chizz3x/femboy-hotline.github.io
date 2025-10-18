// import userSettings, {
//	NUserSettings,
// } from '@front/components/modals/user-settings';
// import {
//	createSlice,
//	PayloadAction,
// } from '@reduxjs/toolkit';
// import { AppState } from '@store/store';
// import { omit } from 'lodash';

/// / Initial state
// export const defaultModalsPayload =
//	{} as NModalsSlice.IModalsPayload;

/// / Actual Slice
// export const modalsSlice = createSlice({
//	name: 'modals',
//	initialState: defaultModalsPayload,
//	reducers: {
//		// setters
//		setModalsState(
//			state,
//			action: PayloadAction<NModalsSlice.IModalsPayload>,
//		) {
//			const { payload } = action;

//			return {
//				...state,
//				...(payload === undefined
//					? undefined
//					: JSON.parse(JSON.stringify(payload))),
//			};
//		},
//		clearModalsState(
//			state,
//			action: PayloadAction<
//				(keyof NModalsSlice.IModalsPayload)[]
//			>,
//		) {
//			const { payload } = action;

//			return omit(
//				state,
//				...payload,
//			) as NModalsSlice.IModalsPayload;
//		},
//	},
// });

// export const { actions: modalsActions } =
//	modalsSlice;

// export const selectModalsState = (
//	state: AppState,
// ) => state.modals; // <- to change

// export default modalsSlice.reducer;

/// / Type for state
/// / eslint-disable-next-line @typescript-eslint/no-empty-interface
// export namespace NModalsSlice {
//	export interface IModalsPayload {
//		userSettings: NUserSettings.IProps;
//	}
// }

// export const ModalComponents: Record<
//	keyof NModalsSlice.IModalsPayload,
//	React.ComponentType
// > = {
//	userSettings,
// };

export {};
