import React from 'react';
import styled from 'styled-components';
import { Header } from '../header';
import { Footer } from '../footer';
import {
	NModals,
	modals as allModals,
} from '../modals/modals';
import { sessionStorageSet } from '../../utils/session-storage';

const Layout = (props: NLayout.IProps) => {
	const {
		children,
		showHeader = true,
		showFooter = true,
	} = props;

	const hasRun = React.useRef(false);
	const firstVisit = sessionStorage.getItem(
		'first-visit',
	);

	// const query = new URLSearchParams(
	//	window.location.search,
	// );

	// const shouldShowSwitchingDomains =
	//	!localStorage.getItem('switching-domains') &&
	//	query.has('switching-domains');
	const shouldShowChangelog =
		!localStorage.getItem('changelog-hide') &&
		firstVisit !== 'false';

	const [modals, setModals] =
		React.useState<NModals.TModals>({
			...(shouldShowChangelog
				? {
						ModalChangelog: { open: true },
				  }
				: {}),
		});

	React.useEffect(() => {
		if (!hasRun.current) {
			hasRun.current = true;
			if (
				!sessionStorage.getItem('first-visit')
			) {
				sessionStorageSet('first-visit', 'false');
			}
		}
	}, []);

	React.useEffect(() => {
		const changeModals = (
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
			changeModals,
		);
		return () => {
			window.removeEventListener(
				'changeModals',
				changeModals,
			);
		};
	}, []);

	return (
		<LayoutStyle>
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
