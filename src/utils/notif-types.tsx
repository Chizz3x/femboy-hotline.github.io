import React from 'react';
import {
	GppBad as GppBadIcon,
	Info as InfoIcon,
	Message as MessageIcon,
	PostAdd as PostAddIcon,
	QuestionAnswer as QuestionAnswerIcon,
	ThreeP as ThreePIcon,
} from '@mui/icons-material';
import { ROUTES } from '../routes';

export const NOTIF_GOTO: Record<number, string> =
	{
		1: ROUTES.user,
		2: ROUTES.forumPost,
	};

export const NOTIF_ICONS: Record<
	string,
	JSX.Element
> = {
	info: <InfoIcon />,
	forum_post: <PostAddIcon />,
	post_comment: <MessageIcon />,
	comment_reply: <QuestionAnswerIcon />,
	private_message: <ThreePIcon />,
	forum_post_violation: <GppBadIcon />,
};

// eslint-disable-next-line no-shadow
export enum NOTIF_TYPES {
	WELCOME = 1,
	NEW_POST = 2,
	POST_VIOLATION = 3,
	NEW_POST_COMMENT = 4,
}

export const NOTIF_DATA: Record<
	number,
	{
		name: string;
		title: string;
		category: string;
		message: React.ReactNode;
		goTo?: number;
	}
> = {
	[NOTIF_TYPES.WELCOME]: {
		name: 'System',
		title: 'Welcome to Femboy Hotline!',
		category: 'generic',
		message: 'Start with setting up your profile',
	},
	[NOTIF_TYPES.NEW_POST]: {
		name: 'Forum Posts',
		title: 'New Post',
		category: 'forum',
		message:
			'New post by {{username}} "{{title}}"',
	},
	[NOTIF_TYPES.POST_VIOLATION]: {
		name: 'Admin',
		title: 'Forum Post Violation',
		category: 'admin',
		message:
			'Your forum post "{{title}}" has been removed for violating our guidelines',
	},
	[NOTIF_TYPES.NEW_POST_COMMENT]: {
		name: 'Forum Comments',
		title: 'New Comment',
		category: 'forum',
		message:
			'{{username}} commented on "{{title}}"',
	},
};

export const NOTIF_CATEGORIES: string[] =
	Object.values(NOTIF_DATA)
		.map((m) => m.category)
		.filter((f, i, a) => a.indexOf(f) === i);

export const NOTIF_CATEGORIES_OPTIONS: {
	label: string;
	value: string;
}[] = NOTIF_CATEGORIES.map((m) => ({
	label: `${m[0].toUpperCase()}${m.slice(1)}`,
	value: m,
}));
