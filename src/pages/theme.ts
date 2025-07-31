import {
	createTheme,
	PaletteMode,
	PaletteOptions,
} from '@mui/material';

const baseTheme = createTheme();

const customColorsDark: PaletteOptions = {
	inputBorder: { main: '#9F9F9F' },
};

const customColorsLight: PaletteOptions = {
	inputBorder: { main: '#9F9F9F' },
};

const augmentedCustomColorsDark =
	Object.fromEntries(
		Object.entries(customColorsDark).map(
			([name, color]) => [
				name,
				baseTheme.palette.augmentColor({
					color,
					name,
				}),
			],
		),
	);

const augmentedCustomColorsLight =
	Object.fromEntries(
		Object.entries(customColorsLight).map(
			([name, color]) => [
				name,
				baseTheme.palette.augmentColor({
					color,
					name,
				}),
			],
		),
	);

const themeDark = createTheme({
	typography: {
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	},
	palette: {
		mode: 'dark',
		text: { primary: '#fff' },
		primary: { main: '#fb5ec7' },
		secondary: { main: '#5fd0f3' },
		background: {
			default: '#202020',
		},
		background_2: {
			default: '#404040',
			paper: '#40404080',
		},
		placeholder: { primary: '#9F9F9Fb3' },
		themeType: '#000',
		...augmentedCustomColorsDark,
	},
});

const themeLight = createTheme({
	typography: {
		fontFamily:
			"-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
	},
	palette: {
		mode: 'light',
		text: { primary: '#fff' },
		primary: { main: '#fb5ec7' },
		secondary: { main: '#5fd0f3' },
		background: { default: '#202020' },
		background_2: { default: '#404040' },
		placeholder: { primary: '#9F9F9Fb3' },
		themeType: '#fff',
		...augmentedCustomColorsLight,
	},
});

export const getTheme = (mode: PaletteMode) => {
	let theme =
		mode === 'dark' ? themeDark : themeLight;
	theme = createTheme(theme, {
		components: {
			MuiInputLabel: {
				styleOverrides: {
					root: {
						color:
							theme?.palette?.placeholder
								?.primary,
						'&.MuiInputLabel-shrink:not(.Mui-focused)':
							{
								color:
									theme?.palette?.inputBorder
										?.main,
							},
					},
				},
			},
			MuiFormHelperText: {
				styleOverrides: {
					root: {
						color:
							theme?.palette?.placeholder
								?.primary,
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						'& .MuiOutlinedInput-notchedOutline':
							{
								borderColor:
									theme?.palette?.inputBorder
										?.main,
							},
						'&:hover .MuiOutlinedInput-notchedOutline':
							{
								borderColor:
									theme?.palette?.primary?.main,
							},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline':
							{
								borderColor:
									theme?.palette?.primary?.main,
							},
					},
					input: {
						'&::placeholder': {
							color:
								theme?.palette?.placeholder
									?.primary,
							opacity: 1,
						},
						'&:-webkit-autofill': {
							WebkitBoxShadow: `0 0 0px 1000px ${theme?.palette?.background_2?.default} inset`,
							WebkitTextFillColor:
								theme?.palette?.text?.primary,
						},
					},
				},
			},
			MuiInput: {
				styleOverrides: {
					root: {
						'& .MuiOutlinedInput-notchedOutline':
							{
								borderColor:
									theme?.palette?.inputBorder
										?.main,
							},
						'&:hover .MuiOutlinedInput-notchedOutline':
							{
								borderColor:
									theme?.palette?.primary?.main,
							},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline':
							{
								borderColor:
									theme?.palette?.primary?.main,
							},
					},
					input: {
						'&::placeholder': {
							color:
								theme?.palette?.placeholder
									?.primary,
							opacity: 1,
						},
						'&:-webkit-autofill': {
							WebkitBoxShadow: `0 0 0px 1000px ${theme?.palette?.background_2?.default} inset`,
							WebkitTextFillColor:
								theme?.palette?.text?.primary,
						},
					},
				},
			},
		},
	});

	return theme;
};
