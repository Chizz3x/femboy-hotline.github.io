import { createGlobalStyle } from 'styled-components';
import { CSSMediaSize } from '../const';

export default createGlobalStyle`
	body {
		margin: 0;
		font-family: ${({ theme }) =>
			theme.typography.fontFamily};
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		background-color: ${({ theme }) =>
			theme?.palette?.background?.default};
		color: ${({ theme }) =>
			theme?.palette?.text?.primary};
		overflow-x: hidden;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	.fake-link {
		color: ${({ theme }) =>
			theme?.palette?.primary?.main};
		cursor: pointer;
	}
	.link {
		text-decoration: none;
		color: ${({ theme }) =>
			theme?.palette?.primary?.main};
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}

	[class^="icon-"] {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.icons-table {
		td {
			&:not(:last-child) {
				padding-right: 20px;
			}
			[class^="icon-"] {
				font-size: 24px;
				cursor: pointer;
			}
			a {
				color: ${({ theme }) =>
					theme?.palette?.text?.primary};
				transition: color .1s;
				&:hover {
					color: ${({ theme }) =>
						theme?.palette?.primary?.light};
				}
			}
		}
	}

	a {
		color: unset;
		text-decoration: none;
		&:hover {
			text-decoration: underline;
		}
		&.colored {
			color: ${({ theme }) =>
				theme?.palette?.primary?.main};
		}
		&.hover-colored {
			&:hover {
				color: ${({ theme }) =>
					theme?.palette?.primary?.main};
			}
		}
	}
  
	button {
		background-color: ${({ theme }) =>
			theme?.palette?.background_2?.default};
		border: none;
		cursor: pointer;
		color: ${({ theme }) =>
			theme?.palette?.text?.primary};
		padding: 10px 15px;
		transition: all .1s;
		font-size: 14px;
		&:hover {
			color: ${({ theme }) =>
				theme?.palette?.primary?.main};
		}
		&.active {
			color: ${({ theme }) =>
				theme?.palette?.primary?.light};
		}
	}

	h1, h2, h3, h4, h5, h6, p {
		margin: 0;
	}

	.grecaptcha-badge { 
    visibility: hidden !important;
	}

	::-webkit-scrollbar {
		background-color: ${({ theme }) =>
			theme?.palette?.background?.default};
	}

	::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) =>
			theme?.palette?.themeType};
	}

	/* Toastify */
	.Toastify {
		position: relative;
		z-index: 99999;
	}
	.toast-item {
		.Toastify__close-button {
			color: ${({ theme }) =>
				theme?.palette?.text?.primary};
		}
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield; /* Firefox */
	}

	.MuiNativeSelect-select {
		padding-left: 4px !important;
	}

	.accordion-simple {
		background-color: transparent !important;
		background-image: none !important;
		box-shadow: none !important;
		.MuiAccordionSummary-root {
			min-height: 0 !important;
			width: max-content;
			margin: 0 auto;
			.MuiAccordionSummary-content {
				margin: 0;
				justify-content: center;
				&:hover {
					text-decoration: underline;
				}
				[data-testid="ExpandMoreIcon"] {
					transition: ${({ theme }) =>
						theme?.transitions?.create(
							'transform',
							{
								duration:
									theme?.transitions?.duration
										?.shortest,
							},
						)}
				}
				&.Mui-expanded {
					[data-testid="ExpandMoreIcon"] {
						transform: rotate(180deg);
					}
				}
			}
		}
		.MuiCollapse-root {
			.MuiCollapse-wrapper {
				.MuiCollapse-wrapperInner {
					.MuiAccordion-region {
						.MuiAccordionDetails-root {
							padding: 6px 16px;
						}
					}
				}
			}
		}
	}

	${CSSMediaSize.tablet} {
		::-webkit-scrollbar {
			width: 5px;
		}
	}
`;
