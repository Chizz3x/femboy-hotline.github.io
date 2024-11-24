import React, {
	createContext,
	useContext,
	useState,
} from 'react';
import useAxios from 'axios-hooks';
import useWatchStorage from '../../../utils/hooks/use-watch-storage';
import { Auth } from '../../../utils/auth';
import { API_ROUTES } from '../../../routes';
import { getUniqueId } from '../../../scripts/unique-id-manager';

const getAuthValue = (
	override?: Partial<NAuthContext.IValue>,
): NAuthContext.IValue => {
	return {
		token: null,
		authed: false,
		loaded: false,
		...override,
	};
};

const defaultValue = getAuthValue();

const AuthContext = createContext(defaultValue);

export const AuthProvider: React.FC<
	React.PropsWithChildren
> = ({ children }) => {
	const [value, setValue] =
		useState<NAuthContext.IValue>(defaultValue);

	const checking = React.useRef(false);

	const dataLocal = useWatchStorage({
		type: 'local',
		keys: ['token'],
		withData: true,
	});

	const dataSession = useWatchStorage({
		type: 'session',
		keys: ['token'],
		withData: true,
	});

	React.useEffect(() => {
		if (checking.current) return;
		checking.current = true;

		(async () => {
			const isAuthed = await Auth.isAuthed();
			console.log('dataSession', dataSession);
			const token =
				(isAuthed
					? dataLocal.data.token ||
					  dataSession.data.token
					: null) || null;
			setValue(
				getAuthValue({
					token: token || null,
					authed: !!token,
					loaded: true,
				}),
			);

			checking.current = false;
		})();
	}, [dataLocal.seed, dataSession.seed]);

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth =
	(): NAuthContext.IValue => {
		const context = useContext(AuthContext);
		if (!context) {
			throw new Error(
				'useAuth must be used within a AuthProvider',
			);
		}
		return context;
	};

export namespace NAuthContext {
	export interface IValue {
		token: string | null;
		authed: boolean;
		loaded: boolean;
	}
}
