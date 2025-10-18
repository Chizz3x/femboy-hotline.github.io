import { RouteProps } from 'react-router-dom';
import React from 'react';
import { Coffee } from '@mui/icons-material';
import { Layout } from '../components/layout';
import { ROUTES } from '../routes';
import ForgotPassword from './forgot-password';
import Register from './register';
import ResendVerification from './resend-verification';
import ResetPassword from './reset-password';
import Home from './Home';
import About from './about';
import Contact from './contact';
import Donate from './donate';
import PrivacyPolicy from './privacy-policy';
import TermsOfService from './terms-of-service';
import Discord from './discord';
import Patreon from './patreon';
import CrashCourse from './crash-course';
import Verify from './verify';
import Login from './login';
import User from './user';
import Forum from './forum';
import ForumPost from './forum-post';
import ForumPostNew from './forum-post-new';
import SafePlace from './safe-place';
import ChangeEmail from './change-email';
import Notifs from './notifs';

export const PAGES: RouteProps[] = [
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
		path: ROUTES.userId,
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
	{
		path: ROUTES.forum,
		element: (
			<Layout>
				<Forum />
			</Layout>
		),
	},
	{
		path: ROUTES.forumPost,
		element: (
			<Layout>
				<ForumPost />
			</Layout>
		),
	},
	{
		path: ROUTES.forumPostNew,
		element: (
			<Layout>
				<ForumPostNew />
			</Layout>
		),
	},
	{
		path: ROUTES.safePlace,
		element: (
			<Layout>
				<SafePlace />
			</Layout>
		),
	},
	{
		path: ROUTES.changeEmail,
		element: (
			<Layout>
				<ChangeEmail />
			</Layout>
		),
	},
	{
		path: ROUTES.notifs,
		element: (
			<Layout>
				<Notifs />
			</Layout>
		),
	},
];
