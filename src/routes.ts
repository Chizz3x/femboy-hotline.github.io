import {
	API_URL,
	CLOUDINARY_NAME,
} from './const';

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
	forum: '/forum',
	forumPost: '/forum/:id',
	forumPostNew: '/forum/new',
	safePlace: '/safe-place',
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
	userUpdateInfo: `${API_URL}/user/update-info`,
	changePicture: `${API_URL}/user/change-picture`,
	requestUploadPicture: `${API_URL}/user/request-upload-picture`,
	changeBanner: `${API_URL}/user/change-banner`,
	changeUsername: `${API_URL}/user/change-username`,
	forumNew: `${API_URL}/forum/new`,
	forumPosts: `${API_URL}/forum`,
	forumPost: `${API_URL}/forum/:id`,
	forumDelete: `${API_URL}/forum/:id/delete`,
	forumEdit: `${API_URL}/forum/:id/edit`,
	forumVote: `${API_URL}/forum/:id/vote`,
	forumComments: `${API_URL}/forum/:id/comments`,
	forumCommentNew: `${API_URL}/forum/:id/comments/new`,
	forumCommentDelete: `${API_URL}/forum/:id/comments/:commentId/delete`,
	forumCommentEdit: `${API_URL}/forum/:id/comments/:commentId/edit`,
};

export const CLOUDINARY_API_ROUTES = {
	upload: `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`,
	getUpload: `https://res.cloudinary.com/${CLOUDINARY_NAME}/image/upload/:folder/:name`,
};
