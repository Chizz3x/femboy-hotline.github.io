import React from 'react';
import {
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as ThemeProviderStyled } from 'styled-components';
import P404 from './404';
import { Layout } from '../components/layout';
import GlobalStyle from './style';
import { GRECAPTCHA_ID } from '../const';
import { AuthProvider } from '../components/contexts/auth';
import { getTheme } from './theme';
import { PAGES } from './pages';

const Index = () => {
	const location = useLocation();

	const [theme, setTheme] = React.useState(
		getTheme('dark'),
	);

	const toastStyle: React.CSSProperties = {
		background:
			theme?.palette?.background?.default,
	};

	// const navigate = useNavigate();
	// const [isProper, setIsProper] =
	//	React.useState(false);

	/// ** Scripts that have to run on every rerender */
	// uniqueIdManager();

	// React.useEffect(() => {
	//	if (location.search.startsWith('?/')) {
	//		navigate(location.search.slice(1));
	//	}
	//	setIsProper(true);
	// }, []);

	// if (!isProper) return null;

	React.useEffect(() => {
		if (window) {
			(window as any).adsbyjuicy =
				(window as any).adsbyjuicy || [];
		}
	}, []);

	React.useEffect(() => {
		document
			.getElementById('root-container')
			?.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<GoogleReCaptchaProvider
			reCaptchaKey={GRECAPTCHA_ID}
		>
			<ThemeProvider theme={theme}>
				<ThemeProviderStyled theme={theme}>
					<GlobalStyle />
					<ToastContainer
						toastStyle={toastStyle}
						toastClassName="toast-item"
						position="bottom-left"
					/>
					<AuthProvider>
						<Routes>
							{PAGES.map((page, index) => (
								<Route
									key={index}
									{...page}
									path={`${page.path?.slice(1)}`}
								/>
							))}
							<Route
								path="/*"
								element={
									<Layout>
										<P404 />
									</Layout>
								}
							/>
						</Routes>
					</AuthProvider>
				</ThemeProviderStyled>
			</ThemeProvider>
		</GoogleReCaptchaProvider>
	);
};

export default Index;
