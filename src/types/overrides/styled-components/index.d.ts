import { Palette as MUIPalette } from '@mui/material';

declare module 'styled-components' {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface DefaultTheme {
		palette?: MUIPalette;
	}
}

export {};
