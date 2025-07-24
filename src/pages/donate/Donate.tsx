import styled from 'styled-components';
import React from 'react';
import {
	CSSMediaSize,
	DONATION,
} from '../../const';
import { CopyButton } from '../../components/copy-button';
import { ROUTES } from '../../routes';
import {
	Guide,
	NGuide,
} from '../../components/guide';

const guidePath: NGuide.IGuidePathItem[] = [
	{
		name: 'Home',
		route: ROUTES.home,
	},
	{
		name: 'Donate',
		route: ROUTES.donate,
	},
];

const Donate = () => {
	const [cryptos, setCryptos] = React.useState<
		typeof DONATION
	>([]);
	const [links, setLinks] = React.useState<
		typeof DONATION
	>([]);

	React.useEffect(() => {
		setCryptos(
			DONATION.filter((f) => f.type === 'crypto'),
		);
		setLinks(
			DONATION.filter((f) => f.type === 'link'),
		);
	}, []);

	return (
		<DonateStyle>
			<Guide path={guidePath} />
			<h2>Support femboy-hotline.com</h2>

			<p>
				Running and maintaining femboy-hotline.com
				incurs costs for hosting, domain
				registration, and other operational
				expenses. We are committed to providing
				valuable content to our visitors free of
				charge. If you find our website helpful
				and would like to support our efforts, we
				welcome your donations.
			</p>

			<h2>Why Donate?</h2>
			<p>
				Your donations help us in the following
				ways:
			</p>
			<ul>
				<li>
					Keep the website online and accessible
					to everyone.
				</li>
				<li>
					Improve and expand our content and
					features.
				</li>
				<li>
					Cover the expenses associated with
					running and maintaining the site.
				</li>
			</ul>

			<h2>How to Donate</h2>
			<p>
				If you would like to make a donation to
				support femboy-hotline.com, you can do so
				via the following methods:
			</p>

			<div className="donate-links">
				{/* <a
					target="_blank"
					href={PATREON}
					rel="noreferrer"
				>
					{PATREON}
				</a>
				<a
					target="_blank"
					href={PATREON}
					rel="noreferrer"
				>
					<div className="patreon">
						<img
							alt="patreon"
							src="/img/donate/patreon.png"
						/>
					</div>
				</a> */}
				<h3>Anonymous methods</h3>
				{cryptos.map((crypto, i) => (
					<div
						key={`crypto-${i}`}
						className="crypto-info"
					>
						<table>
							<tbody>
								<tr>
									<th>Name</th>
									<td>{crypto.name}</td>
								</tr>
								<tr>
									<th>Address</th>
									<td>
										<span>{crypto.address}</span>
										<CopyButton
											data={crypto.address || ''}
										/>
									</td>
								</tr>
								<tr>
									<th>Network</th>
									<td>
										{crypto.network} (
										{crypto.networkName})
									</td>
								</tr>
								<tr>
									<th>Contact information</th>
									<td>{crypto.contactInfo}</td>
								</tr>
							</tbody>
						</table>
					</div>
				))}
				<h3>Other methods</h3>
				{links.map((link, i) => (
					<div>
						<span>{link.name}</span>
						{': '}
						<span>
							<a
								key={`link-${i}`}
								target="_blank"
								href={link.link}
								rel="noreferrer"
							>
								{link.link}
							</a>
						</span>
					</div>
				))}
			</div>
		</DonateStyle>
	);
};

export default Donate;

const DonateStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	.donate-links {
		margin-top: 50px;
		display: flex;
		align-items: left;
		flex-direction: column;
		width: fit-content;
		row-gap: 15px;
	}
	.brand {
		color: var(--c-pink1);
	}
	/*.coffee {
		img {
			width: 200px;
		}
	}*/
	/*.patreon {
		padding: 5px 10px;
		background-color: #ff424d;
		display: flex;
		box-sizing: border-box;
		img {
			width: 180px;
		}
	}*/

	.crypto-info {
		> table {
			text-align: left;
			th {
				min-width: 200px;
			}
		}
		.copy-button {
			margin-left: 5px;
		}
	}

	${CSSMediaSize.phone} {
		padding: 20px 10px;
	}
`;
