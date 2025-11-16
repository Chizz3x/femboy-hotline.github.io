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
			<div className="separator-gradient" />
			<div className="footer-background">
				<div className="footer-content">
					<div className="footer-box footer-box-left">
						<div className="footer-section-title">
							Navigate
						</div>
						<div className="link-grid">
							<Link to={ROUTES.about}>About</Link>
							<Link to={ROUTES.privacyPolicy}>
								Privacy policy
							</Link>
							<Link to={ROUTES.contact}>
								Contact
							</Link>
							<Link to={ROUTES.termsOfService}>
								Terms of service
							</Link>
						</div>
					</div>
					<div className="footer-box footer-box-middle">
						<div className="brand-section">
							<div className="tagline-large">
								Femboy hotline for all our Femboys
							</div>
							<div className="made-with-love">
								<span>Made with </span>
								<Tooltip
									title="Love"
									placement="top"
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
									<span className="love-icon-pulse">
										❤️
									</span>
								</Tooltip>
								<span>
									{' '}
									by passionate developers
								</span>
							</div>
							<div className="copyright-section">
								<span className="uwuright-text">
									uwuright
									<span className="copyright-symbol">
										©
									</span>
								</span>
								<span className="year-range">
									2022-{new Date().getFullYear()}
								</span>
							</div>
							<div className="disclaimer">
								<span>
									Note: This is not a legitimate
									thing and nothing on this page
									is real, sadly
								</span>
							</div>
						</div>
					</div>
					<div className="footer-box footer-box-right">
						<div className="footer-section-title">
							Connect
						</div>
						<div className="social-icons">
							{SOCIAL.map((s) => (
								<a
									key={s.id}
									target="_blank"
									href={s.link}
									rel="noreferrer"
									className="social-icon-link"
								>
									<div className="icon-wrapper">
										{s.icon?.()}
									</div>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</FooterStyle>
	);
};

export { Footer };

const FooterStyle = styled.div`
	width: 100%;
	position: relative;
	z-index: 999;

	.separator-gradient {
		width: 100%;
		height: 2px;
		background: linear-gradient(
			90deg,
			transparent 0%,
			${({ theme }) =>
					theme?.palette?.primary?.main}20
				15%,
			${({ theme }) =>
					theme?.palette?.primary?.main}60
				50%,
			${({ theme }) =>
					theme?.palette?.primary?.main}20
				85%,
			transparent 100%
		);
		box-shadow: 0 0 20px
			${({ theme }) =>
				theme?.palette?.primary?.main}40;
	}

	.footer-background {
		background: linear-gradient(
			180deg,
			${({ theme }) =>
					theme?.palette?.background?.default}
				0%,
			${({ theme }) =>
					theme?.palette?.background?.paper ||
					theme?.palette?.background?.default}
				100%
		);
		position: relative;
		overflow: hidden;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 80%;
			height: 1px;
			background: radial-gradient(
				ellipse at center,
				${({ theme }) =>
						theme?.palette?.primary?.main}40
					0%,
				transparent 70%
			);
			filter: blur(1px);
		}
	}

	.footer-content {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 60px 40px 40px;
		max-width: 1400px;
		margin: 0 auto;
		gap: 60px;
	}

	.footer-box {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.footer-section-title {
		font-size: 13px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 2px;
		opacity: 0.5;
		margin-bottom: 8px;
	}

	.footer-box-left {
		flex: 1;
		min-width: 200px;

		.link-grid {
			display: grid;
			grid-template-columns: 1fr;
			gap: 12px;

			> a {
				position: relative;
				font-size: 15px;
				font-weight: 500;
				padding: 8px 0;
				padding-left: 16px;
				transition: all 0.3s
					cubic-bezier(0.4, 0, 0.2, 1);
				border-left: 2px solid transparent;

				&::before {
					content: '';
					position: absolute;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
					width: 2px;
					height: 0;
					background: ${({ theme }) =>
						theme?.palette?.primary?.main};
					transition: height 0.3s
						cubic-bezier(0.4, 0, 0.2, 1);
				}

				&:hover {
					padding-left: 24px;
					color: ${({ theme }) =>
						theme?.palette?.primary?.main};

					&::before {
						height: 100%;
					}
				}
			}
		}
	}

	.footer-box-middle {
		flex: 2;
		align-items: center;
		text-align: center;

		.brand-section {
			display: flex;
			flex-direction: column;
			gap: 20px;
			align-items: center;
		}

		.tagline-large {
			font-size: 24px;
			font-weight: 700;
			background: linear-gradient(
				135deg,
				${({ theme }) =>
						theme?.palette?.text?.primary}
					0%,
				${({ theme }) =>
						theme?.palette?.primary?.main}
					100%
			);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
			background-clip: text;
			letter-spacing: 0.5px;
			line-height: 1.4;
		}

		.made-with-love {
			display: flex;
			align-items: center;
			gap: 6px;
			font-size: 15px;
			opacity: 0.9;
			flex-wrap: wrap;
			justify-content: center;
		}

		.love-icon-pulse {
			display: inline-flex;
			font-size: 18px;
			animation: pulse-scale 2s ease-in-out
				infinite;
			filter: drop-shadow(
				0 0 8px
					${({ theme }) =>
						theme?.palette?.primary?.main}80
			);

			@keyframes pulse-scale {
				0%,
				100% {
					transform: scale(1);
				}
				50% {
					transform: scale(1.2);
				}
			}
		}

		.copyright-section {
			display: flex;
			align-items: center;
			gap: 8px;
			font-size: 14px;
			opacity: 0.8;

			.uwuright-text {
				display: flex;
				align-items: center;
				gap: 4px;
				font-weight: 600;
			}

			.copyright-symbol {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				font-size: 12px;
				width: 18px;
				height: 18px;
				border: 1.5px solid currentColor;
				border-radius: 50%;
				font-weight: 700;
			}

			.year-range {
				opacity: 0.7;
			}
		}

		.disclaimer {
			margin-top: 8px;
			padding: 12px 20px;
			background: ${({ theme }) =>
				theme?.palette?.background?.paper ||
				theme?.palette?.background?.default};
			border-radius: 8px;
			border: 1px solid
				${({ theme }) =>
					theme?.palette?.divider ||
					'rgba(255, 255, 255, 0.1)'};
			font-size: 12px;
			opacity: 0.7;
			font-style: italic;
			max-width: 400px;
		}
	}

	.footer-box-right {
		flex: 1;
		align-items: flex-end;
		min-width: 200px;

		.social-icons {
			display: flex;
			gap: 12px;
			flex-wrap: wrap;
			justify-content: flex-end;
		}

		.social-icon-link {
			.icon-wrapper {
				width: 44px;
				height: 44px;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 12px;
				background: ${({ theme }) =>
					theme?.palette?.background?.paper ||
					theme?.palette?.background?.default};
				border: 1px solid
					${({ theme }) =>
						theme?.palette?.divider ||
						'rgba(255, 255, 255, 0.1)'};
				transition: all 0.3s
					cubic-bezier(0.4, 0, 0.2, 1);
				position: relative;
				overflow: hidden;

				&::before {
					content: '';
					position: absolute;
					inset: 0;
					background: ${({ theme }) =>
						theme?.palette?.primary?.main};
					opacity: 0;
					transition: opacity 0.3s
						cubic-bezier(0.4, 0, 0.2, 1);
				}

				> svg {
					font-size: 20px;
					position: relative;
					z-index: 1;
					transition: all 0.3s
						cubic-bezier(0.4, 0, 0.2, 1);
				}
			}

			&:hover .icon-wrapper {
				transform: translateY(-4px);
				box-shadow: 0 8px 20px
					${({ theme }) =>
						theme?.palette?.primary?.main}40;
				border-color: ${({ theme }) =>
					theme?.palette?.primary?.main};

				&::before {
					opacity: 0.1;
				}

				> svg {
					transform: scale(1.1);
					color: ${({ theme }) =>
						theme?.palette?.primary?.main};
				}
			}
		}
	}

	${CSSMediaSize.tablet} {
		.footer-content {
			flex-direction: column;
			align-items: center;
			gap: 50px;
			padding: 50px 20px 30px;
		}

		.footer-box {
			width: 100%;
			max-width: 500px;
		}

		.footer-box-left {
			order: 2;
			align-items: center;

			.link-grid {
				width: 100%;
				grid-template-columns: 1fr 1fr;
				gap: 8px;

				> a {
					text-align: center;
					padding-left: 0;

					&::before {
						display: none;
					}

					&:hover {
						padding-left: 0;
					}
				}
			}
		}

		.footer-box-middle {
			order: 1;

			.tagline-large {
				font-size: 20px;
			}

			.disclaimer {
				max-width: 100%;
			}
		}

		.footer-box-right {
			order: 3;
			align-items: center;

			.social-icons {
				justify-content: center;
			}
		}

		.footer-section-title {
			text-align: center;
		}
	}
`;
