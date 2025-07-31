/* eslint-disable @typescript-eslint/no-empty-interface */

import {
	PaletteColor,
	PaletteColorOptions,
	TypeBackground,
	TypeText,
} from '@mui/material';

declare module '@mui/material/styles' {
	interface Palette {
		placeholder?: TypeText;
		inputBorder?: PaletteColor;
		background_2?: TypeBackground;
		themeType?: string;
	}
	interface PaletteOptions {
		placeholder?: Partial<TypeText>;
		inputBorder?: PaletteColorOptions;
		inputBorderActive?: PaletteColorOptions;
		background_2?: Partial<TypeBackground>;
		themeType?: string;
	}
}

export {};
