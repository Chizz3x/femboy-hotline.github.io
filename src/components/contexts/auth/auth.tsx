import React, {
	createContext,
	useContext,
	useState,
} from 'react';
import { v4 as uuid } from 'uuid';
import useWatchStorage from '../../../utils/hooks/use-watch-storage';
import { Auth } from '../../../utils/auth';

const getAuthValue = (
	override?: Partial<NAuthContext.IValue>,
): NAuthContext.IValue => {
	return {
		token: null,
		authed: false,
		loaded: false,
		seed: 'init',
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

	const setAuthData = async () => {
		const isAuthed = await Auth.isAuthed();
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
				seed: uuid(),
			}),
		);

		checking.current = false;
	};

	React.useEffect(() => {
		if (checking.current) return;
		checking.current = true;
		setAuthData();
	}, [dataLocal.seed, dataSession.seed]);

	React.useEffect(() => {
		const checkAuth = () => {
			if (checking.current) return;
			checking.current = true;
			setAuthData();
		};

		window.addEventListener(
			'checkAuth',
			checkAuth,
		);

		return () => {
			window.removeEventListener(
				'checkAuth',
				checkAuth,
			);
		};
	}, []);

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
		seed: string;
	}
}
