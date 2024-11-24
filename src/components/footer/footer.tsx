import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import {
	CSSMediaSize,
	DISCORD_INVITE,
	PATREON,
} from '../../const';
import { ROUTES } from '../../routes';

const Footer = () => {
	return (
		<FooterStyle>
			<div className="footer-box footer-box-left">
				<table className="link-table">
					<tbody>
						<tr>
							<td>
								<Link to={ROUTES.about}>
									About
								</Link>
							</td>
							<td>
								<Link to={ROUTES.privacyPolicy}>
									Privacy policy
								</Link>
							</td>
						</tr>
						<tr>
							<td>
								<Link to={ROUTES.contact}>
									Contact
								</Link>
							</td>
							<td>
								<Link to={ROUTES.termsOfService}>
									Terms of service
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="footer-box footer-box-middle">
				<div>
					<span>
						Femboy hotline for all our Femboys
					</span>
				</div>
				<div>
					<span>
						Made with{' '}
						<Tooltip
							title="Love"
							placement="right"
							arrow
							slotProps={{
								popper: {
									modifiers: [
										{
											name: 'offset',
											options: {
												offset: [0, -5],
											},
										},
									],
								},
							}}
						>
							<span className="love-icon">
								❤
							</span>
						</Tooltip>
					</span>
				</div>
				<div className="uwuright">
					<span>
						uwuright
						<span className="uwuright-sign">
							u
						</span>{' '}
						2022-
						{new Date().getFullYear()}
					</span>
				</div>
				<div className="small">
					<span>
						Note that this is not a legitimate
						thing and nothing on this page is
						real, sadly
					</span>
				</div>
			</div>
			<div className="footer-box footer-box-right">
				<table className="icon-table">
					<tbody>
						<tr>
							<td>
								<a
									target="_blank"
									href={DISCORD_INVITE}
									rel="noreferrer"
								>
									<span className="icon-discord" />
								</a>
							</td>
							<td>
								<a
									target="_blank"
									href={PATREON}
									rel="noreferrer"
								>
									<span className="icon-5968732" />
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</FooterStyle>
	);
};

export { Footer };

const FooterStyle = styled.div`
	width: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
	padding-bottom: 20px;
	padding-top: 20px;
	text-align: center;
	background-color: var(--c-p1);
	z-index: 999;

	.footer-box {
		display: flex;
		flex: 1;
		justify-content: center;

		.link-table {
			> tbody {
				> tr {
					> td {
						&:not(:first-child) {
							padding-left: 20px;
						}
					}
				}
			}
		}
	}
	.footer-box-left {
		justify-content: left;
		padding-left: 20px;
		text-align: left;
	}
	.footer-box-middle {
		flex-direction: column;
	}
	.footer-box-right {
		justify-content: right;
		padding-right: 20px;
	}

	.small {
		margin-top: 10px;
		color: var(--c-p3);
	}

	.uwuright-sign {
		font-size: 12px;
		border: 1px solid var(--c-p8);
		border-radius: 50%;
		height: 12px;
		aspect-ratio: 1/1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.love-icon {
		color: var(--c-pink1);
	}

	${CSSMediaSize.tablet} {
		flex-direction: column;
		align-items: center;
		.footer-box {
			&:not(:last-child) {
				margin-bottom: 30px;
			}
			.link-table {
				text-align: center;
			}
		}
		.footer-box-left,
		.footer-box-right {
			padding: 0;
		}
	}
`;
