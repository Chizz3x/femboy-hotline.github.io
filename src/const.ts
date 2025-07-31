import IconDiscord from './components/icons/icon-discord';
import IconInstagram from './components/icons/icon-instagram';
import IconTiktok from './components/icons/icon-tiktok';
import IconX from './components/icons/icon-x';
import IconYoutube from './components/icons/icon-youtube';

export const IS_DEV =
	process.env.NODE_ENV === 'development';
const PROD_API =
	process.env.REACT_APP_PROD_API === 'true';

export const VERSION = '1.0.1';

export const USER_ROLE = {
	OWNER: 1,
	ADMIN: 2,
};

export const CSSMediaSize = {
	phone_small:
		'@media only screen and (max-width: 400px)',
	phone:
		'@media only screen and (max-width: 600px)',
	phone_big:
		'@media only screen and (max-width: 768px)',
	tablet:
		'@media only screen and (max-width: 992px)',
	pc_small:
		'@media only screen and (max-width: 1366px)',
	pc: '@media only screen and (max-width: 1440px)',
	pc_big:
		'@media only screen and (max-width: 1536px)',
	pc_huge:
		'@media only screen and (max-width: 1600px)',
};

export const SOCIAL: {
	id: string;
	name: string;
	socialName?: string;
	link: string;
	description?: string;
	icon?: () => JSX.Element;
}[] = [
	{
		id: 'dc',
		name: 'Discord',
		socialName: 'AnimeCord',
		link: 'https://discord.gg/yKTgJzceWh',
		description:
			'Mostly for suggestions, general support (not femboy related server)',
		icon: IconDiscord,
	},
	{
		id: 'x',
		name: 'X',
		link: 'https://x.com/femboy_hotline',
		icon: IconX,
	},
	{
		id: 'ig',
		name: 'Instagram',
		link: 'https://www.instagram.com/femboy.hotline',
		icon: IconInstagram,
	},
	{
		id: 'tt',
		name: 'TikTok',
		link: 'https://www.tiktok.com/@femboy.hotline',
		icon: IconTiktok,
	},
	{
		id: 'yt',
		name: 'YouTube',
		link: 'https://www.youtube.com/@FemboyHotline',
		icon: IconYoutube,
	},
];

export const DONATION: {
	type: 'link' | 'crypto';
	id: string;
	name: string;
	link?: string;
	address?: string;
	network?: string;
	networkName?: string;
	contactInfo?: string;
}[] = [
	{
		type: 'link',
		id: 'ptrn',
		name: 'Patreon',
		link: 'https://patreon.com/FemboyHotline',
	},
	{
		type: 'crypto',
		id: 'BTC',
		name: 'Bitcoin',
		address:
			'0x7adf9b0d8b1ff39b55cfebfc14f3b2b43375612e',
		network: 'ERC20',
		networkName: 'Ethereum',
		contactInfo: '***22541',
	},
];

export const EMAIL = 'femboy.fellaboy@gmail.com';

export const GRECAPTCHA_ID = IS_DEV
	? '6Lcq0YgqAAAAAC9Bo4gvD5dGCEyrSx9djpuA4_A-'
	: '6LcuP4UqAAAAAEpcSqmbp2bV6GOcyFL_DpSc9Dks';

export const API_URL =
	IS_DEV && !PROD_API
		? 'http://localhost:3001'
		: 'https://api.femboy-hotline.com';

export const CLOUDINARY_NAME = 'dqye0bas9';
export const CLOUDINARY_KEY = '158377647424629';

export const TEST = 'test';

if (IS_DEV)
	// eslint-disable-next-line no-console
	console.log('USING PROD_API: ', PROD_API);
