import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from '@mui/material';
import { CSSMediaSize } from '../../const';

const sizes = {
	mobile: {
		w: 300,
		h: 100,
	},
	desktop: {
		w: 908,
		h: 258,
	},
};

const JABillboard = (
	props: NJABillboard.IProps,
) => {
	const { id, idMobile, width, height } = props;

	const isTablet = useMediaQuery(
		CSSMediaSize.tablet,
	);

	const adRef = useRef<HTMLDivElement>(null);
	const [adBlocked, setAdBlocked] =
		React.useState(false);

	const [activeId, setActiveId] = React.useState(
		isTablet && idMobile ? idMobile : id,
	);

	useEffect(() => {
		const script =
			document.createElement('script');
		script.src =
			'https://poweredby.jads.co/js/jads.js';
		script.async = true;
		script.setAttribute('data-cfasync', 'false');

		document.body.appendChild(script);

		let timeoutHandle: NodeJS.Timeout | null =
			null;

		script.onload = () => {
			try {
				if (window) {
					(window as any).adsbyjuicy =
						(window as any).adsbyjuicy || [];
					(window as any).adsbyjuicy.push({
						adzone: activeId,
					});
				}

				timeoutHandle = setTimeout(() => {
					const ins =
						adRef.current?.getElementsByTagName(
							'ins',
						);
					const iframe =
						adRef.current?.getElementsByTagName(
							'iframe',
						);
					if (
						!ins?.length &&
						iframe?.length &&
						iframe[0]?.offsetHeight === 0
					) {
						setAdBlocked(true);
					}
				}, 1000);
			} catch (e) {
				console.error(
					'JuicyAds failed to initialize:',
					e,
				);
				setAdBlocked(true);
			}
		};

		script.onerror = () => {
			setAdBlocked(true);
		};

		return () => {
			if (timeoutHandle)
				clearTimeout(timeoutHandle);
			script.remove();
		};
	}, [activeId]);

	React.useEffect(() => {
		setActiveId(
			isTablet && idMobile ? idMobile : id,
		);
	}, [isTablet]);

	if (adBlocked) {
		return (
			<JABillboardStyle className="ad-container ad-billboard ad-blocked">
				Please whitelist this website on your ad
				blocker. (We don&apos;t use click ads ;P)
				<p>THANKS!</p>
			</JABillboardStyle>
		);
	}

	return (
		<JABillboardStyle
			className="ad-container ad-billboard"
			ref={adRef}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: `<ins id="${activeId}" data-width="${
					width ||
					sizes[isTablet ? 'mobile' : 'desktop']
						?.w
				}" data-height="${
					height ||
					sizes[isTablet ? 'mobile' : 'desktop']
						?.h
				}"></ins>`,
			}}
		/>
	);
};

export { JABillboard };

export namespace NJABillboard {
	export interface IProps {
		id: number;
		idMobile?: number;
		width?: number;
		height?: number;
	}
}

const JABillboardStyle = styled.div`
	max-width: 100%;
	display: flex;
	justify-content: center;
	margin: 10px 0;
	&.ad-blocked {
		box-sizing: border-box;
		color: white;
		font-weight: 700;
		font-size: 24px;
		background-color: ${({ theme }) =>
			theme?.palette?.error?.main};
		padding: 25px;
		border-radius: 8px;
		margin-bottom: 25px;
		text-align: center;
	}
`;
