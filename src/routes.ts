import { API_URL } from './const';

export const ROUTES = {
	home: '/',
	about: '/about',
	contact: '/contact',
	donate: '/donate',
	privacyPolicy: '/privacy-policy',
	coffee: '/coffee',
	patreon: '/patreon',
	discord: '/discord',
	crashCourse: '/crash-course',
	register: '/register',
	termsOfService: '/terms-of-service',
	verify: '/verify',
	login: '/login',
	user: '/user',
	userId: '/user/:id',
	resendVerification: '/resend-verification',
	forgotPassword: '/forgot-password',
	resetPassword: '/reset-password',
	forums: '/forums',
	forumPost: '/forums/:id',
	forumPostNew: '/forums/new',
};

export const API_ROUTES = {
	// User
	getMe: `${API_URL}/user`,
	getUser: `${API_URL}/user/:id`,
	login: `${API_URL}/user/login`,
	register: `${API_URL}/user/register`,
	verify: `${API_URL}/user/verify`,
	verifyAuth: `${API_URL}/user/verify-auth`,
	logout: `${API_URL}/user/logout`,
	resendVerification: `${API_URL}/user/resend-verification`,
	forgotPassword: `${API_URL}/user/forgot-password`,
	resetPassword: `${API_URL}/user/reset-password`,
	changePicture: `${API_URL}/user/change-picture`,
	changeBanner: `${API_URL}/user/change-banner`,
};
