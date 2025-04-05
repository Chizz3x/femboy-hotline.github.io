export const IS_DEV =
	process.env.NODE_ENV === 'development';

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

export const DISCORD_INVITE =
	'https://discord.gg/yKTgJzceWh';
export const PATREON =
	'https://patreon.com/FemboyHotline';
export const COFFEE =
	'https://www.buymeacoffee.com/Milim';
export const EMAIL = 'femboy.fellaboy@gmail.com';

export const GRECAPTCHA_ID = IS_DEV
	? '6Lcq0YgqAAAAAC9Bo4gvD5dGCEyrSx9djpuA4_A-'
	: '6LcuP4UqAAAAAEpcSqmbp2bV6GOcyFL_DpSc9Dks';

export const API_URL = IS_DEV
	? 'http://localhost:3001'
	: 'https://api.femboy-hotline.com';

export const TEST = 'test';
