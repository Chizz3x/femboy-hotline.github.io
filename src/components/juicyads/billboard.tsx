import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const JABillboard = (
	props: NJABillboard.IProps,
) => {
	const { id, width = 908, height = 258 } = props;

	const adRef = useRef<HTMLDivElement>(null);
	const [adBlocked, setAdBlocked] =
		React.useState(false);

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
						adzone: id,
					});
				}

				timeoutHandle = setTimeout(() => {
					const ins =
						adRef.current?.querySelector('ins');
					if (ins && ins.offsetHeight === 0) {
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
	}, [id]);

	if (adBlocked) {
		return (
			<JABillboardStyle className="ad-blocked">
				Please whitelist this website on your ad
				blocker. (We don&apos;t use click ads ;P)
				<p>THANKS!</p>
			</JABillboardStyle>
		);
	}

	return (
		<JABillboardStyle
			ref={adRef}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{
				__html: `<ins id="${id}" data-width="${width}" data-height="${height}"></ins>`,
			}}
		/>
	);
};

export { JABillboard };

export namespace NJABillboard {
	export interface IProps {
		id: number;
		width?: number;
		height?: number;
	}
}

const JABillboardStyle = styled.div`
	max-width: 100%;
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
