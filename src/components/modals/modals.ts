import { ComponentProps } from 'react';
import * as ModalSwitchingDomains from './switching-domains';

export const modals = [ModalSwitchingDomains];

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
