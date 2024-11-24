import React from 'react';
import { v4 as uuid } from 'uuid';

export default <WithData extends boolean = false>(
	props: NWatchLocalStorageChange.IProps<WithData>,
): NWatchLocalStorageChange.TRes<WithData> => {
	const { keys, type, withData } = props;

	const [
		localStorageChanged,
		setLocalStorageChanged,
	] = React.useState<string>('');

	React.useEffect(() => {
		const watchStorage = (
			event: StorageEvent,
		) => {
			if (
				((type === 'local' &&
					event.storageArea === localStorage) ||
					(type === 'session' &&
						event.storageArea ===
							sessionStorage)) &&
				keys.includes(event.key as string)
			) {
				setLocalStorageChanged(uuid());
			}
		};

		setLocalStorageChanged(uuid());

		window.addEventListener(
			'storage',
			watchStorage,
		);

		return () => {
			window.removeEventListener(
				'storage',
				watchStorage,
			);
		};
	}, []);

	if (withData)
		return {
			seed: localStorageChanged,
			data: keys.reduce(
				(p, c) => ({
					...p,
					[c]: localStorage.getItem(c),
				}),
				{},
			) as NWatchLocalStorageChange.TData,
		} as NWatchLocalStorageChange.TRes<WithData>;
	return localStorageChanged as NWatchLocalStorageChange.TRes<WithData>;
};

export namespace NWatchLocalStorageChange {
	export interface IProps<
		WithData extends boolean,
	> {
		keys: string[];
		type: 'local' | 'session';
		withData?: WithData;
	}
	export type TData = Record<
		string,
		string | null
	>;
	export type TRes<WithData> =
		WithData extends true
			? { seed: string; data: TData }
			: string;
}
