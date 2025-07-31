import React from 'react';
import styled from 'styled-components';
import {
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { Header } from '../header';
import { Footer } from '../footer';
import {
	NModals,
	modals as allModals,
	changeModals,
} from '../modals/modals';
import { sessionStorageSet } from '../../utils/session-storage';
import { VERSION } from '../../const';
import { ROUTES } from '../../routes';
import useWatchStorage from '../../utils/hooks/use-watch-storage';

const Layout = (props: NLayout.IProps) => {
	const {
		children = null,
		showHeader = true,
		showFooter = true,
	} = props;

	const navigate = useNavigate();
	const location = useLocation();

	const [hasRun, setHasRun] =
		React.useState<boolean>(false);
	const [modalsInit, setModalsInit] =
		React.useState<boolean>(false);

	const [modals, setModals] =
		React.useState<NModals.TModals>({});

	const dataLocal = useWatchStorage({
		type: 'local',
		keys: ['ageChecked'],
		withData: true,
	});
	const dataSession = useWatchStorage({
		type: 'session',
		keys: ['underage'],
		withData: true,
	});
	const isAgeChecked =
		dataLocal?.data?.ageChecked === 'true';
	const isUnderage =
		dataSession?.data?.underage === 'true';
	const isMaybeUnderage =
		dataSession?.data?.underage === null &&
		!isAgeChecked;

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
						localStorage.getItem(
							'changelog-hide',
						) !== VERSION;
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
			setModals((modalsData) => ({
				...modalsData,
				...(typeof event?.detail === 'object' &&
				!Array.isArray(event?.detail)
					? event?.detail
					: {}),
			}));
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

	React.useEffect(() => {
		if (
			isUnderage &&
			location.pathname !== ROUTES.safePlace
		) {
			navigate(ROUTES.safePlace);
		} else if (!isAgeChecked && isMaybeUnderage) {
			window.dispatchEvent(
				changeModals({
					ModalUnderageCheck: { open: true },
				}),
			);
		}
	}, [dataSession?.seed, location.pathname]);

	return (
		<LayoutStyle id="root-container">
			{allModals.map((modal, index) =>
				modal.name in modals &&
				modals?.[modal.name] ? (
					<modal.Modal
						key={index}
						{...(modals[modal.name] as any)}
					/>
				) : null,
			)}
			{(!isUnderage && !isMaybeUnderage) ||
			location.pathname === ROUTES.safePlace ? (
				<>
					{showHeader &&
					!isUnderage &&
					!isMaybeUnderage ? (
						<Header />
					) : null}
					{children}
					{showFooter &&
					!isUnderage &&
					!isMaybeUnderage ? (
						<Footer />
					) : null}
				</>
			) : null}
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
