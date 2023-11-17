import { createGlobalStyle } from "styled-components";
import { CSSMediaSize } from "./const";

export default createGlobalStyle`
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
			'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
			sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		background-color: var(--c-p1);
		color: var(--c-p8);
		overflow-x: hidden;
	}

	code {
		font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
			monospace;
	}

	.fake-link {
		color: var(--c-pink1);
		cursor: pointer;
	}

	.icon-table {
		td {
			:not(:last-child) {
				padding-right: 20px;
			}
			[class^="icon-"] {
				font-size: 24px;
				cursor: pointer;
			}
			a {
				color: var(--c-p8);
				transition: color .1s;
				:hover {
					color: var(--c-pink3);
				}
			}
		}
	}

	a {
		color: unset
	}

	button {
		background-color: var(--c-p2);
		border: none;
		cursor: pointer;
		color: var(--c-p8);
		padding: 10px 15px;
		transition: all .1s;
		font-size: 14px;
		:hover {
			color: var(--c-pink1) !important;
		}
		&.active {
			color: var(--c-pink3);
		}
	}

	:root {
		--c-p:  #000000;
		--c-p1: #202020;
		--c-p1-aa: #202020aa;
		--c-p2: #404040;
		--c-p3: #606060;
		--c-p4: #808080;
		--c-p5: #9F9F9F;
		--c-p6: #BFBFBF;
		--c-p7: #DFDFDF;
		--c-p8: #ffffff;

		--c-pink1: #fb5ec7;
		--c-pink2: #b92d8a;
		--c-pink3: #ff97dc;

		--c-red1: #f43c32;
	}

	::-webkit-scrollbar {
		background-color: var(--c-p);
	}

	::-webkit-scrollbar-thumb {
		background-color: var(--c-p1);
	}

	${CSSMediaSize.tablet} {
		::-webkit-scrollbar {
			width: 5px;
		}
	}
`;