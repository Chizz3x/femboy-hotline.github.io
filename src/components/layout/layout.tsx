import React from 'react';
import styled from 'styled-components';
import { Header } from '../header';
import { Footer } from '../footer';
import {
	NModals,
	modals as allModals,
	changeModals,
} from '../modals/modals';
import { sessionStorageSet } from '../../utils/session-storage';

const Layout = (props: NLayout.IProps) => {
	const {
		children = null,
		showHeader = true,
		showFooter = true,
	} = props;

	const [hasRun, setHasRun] =
		React.useState<boolean>(false);
	const [modalsInit, setModalsInit] =
		React.useState<boolean>(false);

	// const query = new URLSearchParams(
	//	window.location.search,
	// );

	// const shouldShowSwitchingDomains =
	//	!localStorage.getItem('switching-domains') &&
	//	query.has('switching-domains');

	const [modals, setModals] =
		React.useState<NModals.TModals>({});

	// React.useEffect(() => {
	//	const firstVisit = sessionStorage.getItem(
	//		'first-visit',
	//	);
	//	const shouldShowChangelog =
	//		!localStorage.getItem('changelog-hide') &&
	//		firstVisit !== 'false';

	//	if (shouldShowChangelog) {
	//		window.dispatchEvent(
	//			changeModals({
	//				ModalChangelog: { open: true },
	//			}),
	//		);
	//	}
	// }, []);

	React.useEffect(() => {
		if (modalsInit) {
			if (!hasRun) {
				setHasRun(true);
				if (
					!sessionStorage.getItem('first-visit')
				) {
					sessionStorageSet(
						'first-visit',
						'false',
					);
					const shouldShowChangelog =
						!localStorage.getItem(
							'changelog-hide',
						);
					if (shouldShowChangelog) {
						window.dispatchEvent(
							changeModals({
								ModalChangelog: { open: true },
							}),
						);
					}
				}
			}
		}
	}, [modalsInit]);

	React.useEffect(() => {
		const changeModalsInner = (
			event: WindowEventMap['changeModals'],
		) => {
			setModals({
				...modals,
				...(typeof event?.detail === 'object' &&
				!Array.isArray(event?.detail)
					? event?.detail
					: {}),
			});
		};

		window.addEventListener(
			'changeModals',
			changeModalsInner,
		);

		setModalsInit(true);

		return () => {
			window.removeEventListener(
				'changeModals',
				changeModalsInner,
			);
		};
	}, []);

	return (
		<LayoutStyle id="root-container">
			{allModals.map((modal, index) =>
				modal.name in modals &&
				modals?.[modal.name] ? (
					<modal.Modal
						key={index}
						{...modals[modal.name]}
					/>
				) : null,
			)}
			{showHeader ? <Header /> : null}
			{children}
			{showFooter ? <Footer /> : null}
		</LayoutStyle>
	);
};

export { Layout };

export namespace NLayout {
	export interface IProps {
		children?: JSX.Element;
		padding?: boolean;
		showHeader?: boolean;
		showFooter?: boolean;
	}
}

const LayoutStyle = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	overflow-x: hidden;
	flex-direction: column;

	@function hexToRGB($hex) {
		@return red($hex), green($hex), blue($hex);
	}
`;
