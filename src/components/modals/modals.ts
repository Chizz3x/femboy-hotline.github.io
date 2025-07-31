import { ComponentProps } from 'react';
import * as ModalSwitchingDomains from './switching-domains';
import * as ModalChangelog from './changelog';
import * as ModalChangePicture from './change-picture';
import * as ModalChangeBanner from './change-banner';
import * as ModalDeletePost from './delete-post';
import * as ModalDeletePostComment from './delete-post-comment';
import * as ModalUnderageCheck from './underage-check';
import * as ModalUploadPicture from './upload-picture';
import * as ModalClearUserInfo from './clear-info';

export const modals = [
	ModalSwitchingDomains,
	ModalChangelog,
	ModalChangePicture,
	ModalChangeBanner,
	ModalDeletePost,
	ModalDeletePostComment,
	ModalUnderageCheck,
	ModalUploadPicture,
	ModalClearUserInfo,
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
			> | null
		>
	>;
}
