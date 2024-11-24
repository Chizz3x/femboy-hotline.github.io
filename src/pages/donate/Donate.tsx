import styled from 'styled-components';
import React from 'react';
import {
	CSSMediaSize,
	PATREON,
} from '../../const';

const Donate = () => {
	return (
		<DonateStyle>
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
				<a
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
				</a>
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
		> * {
			&:not(:last-child) {
				margin-bottom: 10px;
			}
		}
	}
	.brand {
		color: var(--c-pink1);
	}
	.coffee {
		img {
			width: 200px;
		}
	}
	.patreon {
		padding: 5px 10px;
		background-color: #ff424d;
		display: flex;
		box-sizing: border-box;
		img {
			width: 180px;
		}
	}

	${CSSMediaSize.phone} {
		padding: 20px 10px;
	}
`;
