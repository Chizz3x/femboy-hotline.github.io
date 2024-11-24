import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import './icons.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import {
	ThemeProvider,
	createTheme,
} from '@mui/material/styles';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import GlobalStyle from './style';
import Index from './pages';
import { GRECAPTCHA_ID } from './const';
import { AuthProvider } from './components/contexts/auth';

const toastStyle: React.CSSProperties = {
	background: 'var(--c-p1-aa)',
};

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

const theme = createTheme({
	palette: {
		mode: 'dark',
		text: { primary: '#fff' },
		primary: { main: '#fb5ec7' },
		secondary: { main: '#9c27b0' },
	},
	components: {
		MuiInputLabel: {
			styleOverrides: {
				root: { color: 'var(--c-p5)' },
			},
		},
		MuiFormHelperText: {
			styleOverrides: {
				root: { color: 'var(--c-p5)' },
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'var(--c-p5)',
					},
					'&:hover .MuiOutlinedInput-notchedOutline':
						{
							borderColor: 'var(--c-pink1)',
						},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline':
						{
							borderColor: 'var(--c-pink1)',
						},
				},
				input: {
					'&::placeholder': {
						color: 'var(--c-p5)',
						opacity: 1,
					},
					'&:-webkit-autofill': {
						WebkitBoxShadow:
							'0 0 0px 1000px var(--c-p2) inset',
						WebkitTextFillColor: '#fff',
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'var(--c-p5)',
					},
					'&:hover .MuiOutlinedInput-notchedOutline':
						{
							borderColor: 'var(--c-pink1)',
						},
					'&.Mui-focused .MuiOutlinedInput-notchedOutline':
						{
							borderColor: 'var(--c-pink1)',
						},
				},
				input: {
					'&::placeholder': {
						color: 'var(--c-p5)',
						opacity: 1,
					},
					'&:-webkit-autofill': {
						WebkitBoxShadow:
							'0 0 0px 1000px var(--c-p2) inset',
						WebkitTextFillColor: '#fff',
					},
				},
			},
		},
	},
});

root.render(
	<React.StrictMode>
		<GoogleReCaptchaProvider
			reCaptchaKey={GRECAPTCHA_ID}
		>
			<GlobalStyle />
			<ToastContainer
				toastStyle={toastStyle}
				position="bottom-left"
			/>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					<AuthProvider>
						<Index />
					</AuthProvider>
				</ThemeProvider>
			</BrowserRouter>
		</GoogleReCaptchaProvider>
	</React.StrictMode>,
);
