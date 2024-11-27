import React from 'react';
import {
	Route,
	RouteProps,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import P404 from './404';
import { Layout } from '../components/layout';
import About from './about';
import Contact from './contact';
import Donate from './donate';
import PrivacyPolicy from './privacy-policy';
import Discord from './discord';
import Patreon from './patreon';
import Coffee from './coffee';
import { ROUTES } from '../routes';
import Home from './Home';
import CrashCourse from './crash-course/crash-course';
import Register from './register';
import TermsOfService from './terms-of-service';
import Verify from './verify';
import Login from './login';
import uniqueIdManager from '../scripts/unique-id-manager';
import User from './user';
import ResendVerification from './resend-verification';
import ForgotPassword from './forgot-password';
import ResetPassword from './reset-password';

const PAGES: RouteProps[] = [
	{
		path: ROUTES.home,
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: ROUTES.about,
		element: (
			<Layout>
				<About />
			</Layout>
		),
	},
	{
		path: ROUTES.contact,
		element: (
			<Layout>
				<Contact />
			</Layout>
		),
	},
	{
		path: ROUTES.donate,
		element: (
			<Layout>
				<Donate />
			</Layout>
		),
	},
	{
		path: ROUTES.privacyPolicy,
		element: (
			<Layout>
				<PrivacyPolicy />
			</Layout>
		),
	},
	{
		path: ROUTES.discord,
		element: (
			<Layout>
				<Discord />
			</Layout>
		),
	},
	{
		path: ROUTES.patreon,
		element: (
			<Layout>
				<Patreon />
			</Layout>
		),
	},
	{
		path: ROUTES.coffee,
		element: (
			<Layout>
				<Coffee />
			</Layout>
		),
	},
	{
		path: ROUTES.crashCourse,
		element: (
			<Layout>
				<CrashCourse />
			</Layout>
		),
	},
	{
		path: ROUTES.register,
		element: (
			<Layout>
				<Register />
			</Layout>
		),
	},
	{
		path: ROUTES.termsOfService,
		element: (
			<Layout>
				<TermsOfService />
			</Layout>
		),
	},
	{
		path: ROUTES.verify,
		element: (
			<Layout>
				<Verify />
			</Layout>
		),
	},
	{
		path: ROUTES.login,
		element: (
			<Layout>
				<Login />
			</Layout>
		),
	},
	{
		path: ROUTES.user,
		element: (
			<Layout>
				<User />
			</Layout>
		),
	},
	{
		path: ROUTES.resendVerification,
		element: (
			<Layout>
				<ResendVerification />
			</Layout>
		),
	},
	{
		path: ROUTES.forgotPassword,
		element: (
			<Layout>
				<ForgotPassword />
			</Layout>
		),
	},
	{
		path: ROUTES.resetPassword,
		element: (
			<Layout>
				<ResetPassword />
			</Layout>
		),
	},
];

const Index = () => {
	// const location = useLocation();
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

	return (
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
	);
};

export default Index;
