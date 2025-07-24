import styled from 'styled-components';
import React from 'react';
import {
	CSSMediaSize,
	SOCIAL,
	EMAIL,
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
		name: 'Contact',
		route: ROUTES.contact,
	},
];

const Contact = () => {
	return (
		<ContactStyle>
			<Guide path={guidePath} />
			<h2>
				Contact information we are willing to
				disclose
			</h2>
			<div className="social-row">
				Email:{' '}
				<a href={`mailto:${EMAIL}`}>{EMAIL}</a>
				<CopyButton data={EMAIL} />
				<div className="description">
					<span>
						Inquiries, direct contact,
						suggestions, support and so on...
						(everything and anything)
					</span>
				</div>
			</div>
			{SOCIAL.map((social) => (
				<div
					key={social.name}
					className="social-row"
				>
					{social.name}:{' '}
					<a
						target="_blank"
						href={social.link}
						rel="noreferrer"
					>
						{social.socialName
							? social.socialName
							: social.link}
					</a>
					<CopyButton data={social.link} />
					{social.description ? (
						<div className="description">
							<span>{social.description}</span>
						</div>
					) : null}
				</div>
			))}
			<p className="gray smol">
				Of course you can find us on other places,
				that is if you know where to look ;P
			</p>
		</ContactStyle>
	);
};

export default Contact;

const ContactStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	> h2 {
		margin-bottom: 20px;
	}
	.social-row {
		margin: 5px 0;
		> .description {
			margin: 0;
			font-size: 14px;
			color: var(--c-p4);
			border-left: 1px solid var(--c-p3);
			padding-left: 10px;
		}
	}
	.gray {
		color: var(--c-p3);
	}
	.smol {
		font-size: 12px;
		color: var(--c-p3);
	}
	.copy-button {
		padding-left: 10px;
	}

	${CSSMediaSize.phone} {
		padding: 20px 10px;
	}
`;
