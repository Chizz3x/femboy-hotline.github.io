import React from 'react';
import {
	Info as InfoIcon,
	Message as MessageIcon,
	QuestionAnswer as QuestionAnswerIcon,
	ThreeP as ThreePIcon,
} from '@mui/icons-material';
import { ROUTES } from '../routes';

export const NOTIF_GOTO: Record<number, string> =
	{
		1: ROUTES.user,
	};

export const NOTIF_ICONS: Record<
	string,
	JSX.Element
> = {
	info: <InfoIcon />,
	postComment: <MessageIcon />,
	commentReply: <QuestionAnswerIcon />,
	privateMessage: <ThreePIcon />,
};

export const NOTIF_TYPES: Record<
	number,
	{
		name: string;
		title: string;
		category: string;
		message: React.ReactNode;
		goTo?: number;
	}
> = {
	1: {
		name: 'System',
		title: 'Welcome to Femboy Hotline!',
		category: 'generic',
		message: 'Start with setting up your profile',
	},
};

export const NOTIF_CATEGORIES: string[] =
	Object.values(NOTIF_TYPES)
		.map((m) => m.category)
		.filter((f, i, a) => a.indexOf(f) === i);

export const NOTIF_CATEGORIES_OPTIONS: {
	label: string;
	value: string;
}[] = NOTIF_CATEGORIES.map((m) => ({
	label: `${m[0].toUpperCase()}${m.slice(1)}`,
	value: m,
}));
