import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import {
	CSSMediaSize,
	SOCIAL,
} from '../../const';
import { ROUTES } from '../../routes';

const Footer = () => {
	return (
		<FooterStyle id="root-footer">
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
							<span className="uwuright-letter">
								u
							</span>
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
							{SOCIAL.map((s) => (
								<td key={s.id}>
									<a
										target="_blank"
										href={s.link}
										rel="noreferrer"
									>
										{s.icon?.()}
									</a>
								</td>
							))}
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
	background-color: ${({ theme }) =>
		theme?.palette?.background?.default};
	z-index: 999;

	.footer-box {
		display: flex;
		flex: 1;
		justify-content: center;

		.link-table {
			> tbody {
				> tr {
					> td {
						> a {
							&:hover {
								color: ${({ theme }) =>
									theme?.palette?.primary?.main};
							}
						}
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
		color: ${({ theme }) =>
			theme?.palette?.text?.secondary};
	}

	.uwuright {
		> span {
			display: inline-flex;
		}
	}
	.uwuright-sign {
		margin-top: 1px;
		font-size: 10px;
		border: 1px solid
			${({ theme }) =>
				theme?.palette?.text?.primary};
		border-radius: 50%;
		height: 9px;
		width: 9px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		.uwuright-letter {
			transform: translate(-0.5px, -1.8px);
		}
	}

	.love-icon {
		color: ${({ theme }) =>
			theme?.palette?.primary?.main};
	}

	${CSSMediaSize.tablet} {
		flex-direction: column;
		align-items: center;
		row-gap: 30px;
		.footer-box {
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
