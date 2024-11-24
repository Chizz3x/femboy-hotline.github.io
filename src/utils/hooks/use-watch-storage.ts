import React from 'react';
import { v4 as uuid } from 'uuid';

export default <WithData extends boolean = false>(
	props: NWatchLocalStorageChange.IProps<WithData>,
): NWatchLocalStorageChange.TRes<WithData> => {
	const { keys, type, withData } = props;

	const [storageChanged, setStorageChanged] =
		React.useState<string>('');

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
				setStorageChanged(uuid());
			}
		};

		setStorageChanged(uuid());

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
			seed: storageChanged,
			data: keys.reduce(
				(p, c) => ({
					...p,
					[c]: (type === 'local'
						? localStorage
						: sessionStorage
					).getItem(c),
				}),
				{},
			) as NWatchLocalStorageChange.TData,
		} as NWatchLocalStorageChange.TRes<WithData>;
	return storageChanged as NWatchLocalStorageChange.TRes<WithData>;
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
