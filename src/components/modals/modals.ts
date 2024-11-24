import { ComponentProps } from 'react';
import * as ModalSwitchingDomains from './switching-domains';
import * as ModalChangelog from './changelog';

export const modals = [
	ModalSwitchingDomains,
	ModalChangelog,
];

export const changeModals = <
	D extends NModals.TModals,
>(
	eventDetail: D,
): CustomEvent<D> =>
	new CustomEvent('changeModals', {
		detail: eventDetail,
	});

export namespace NModals {
	export interface IDefaultProps {
		open?: string | boolean | null;
		title?: string;
		showHeader?: boolean;
		centerHeader?: boolean;
	}
	export type TModals = Partial<
		Record<
			(typeof modals)[number]['name'],
			ComponentProps<
				(typeof modals)[number]['Modal']
			>
		>
	>;
}
