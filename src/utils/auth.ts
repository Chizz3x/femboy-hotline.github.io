import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { API_ROUTES } from '../routes';
import { getUniqueId } from '../scripts/unique-id-manager';
import {
	localStorageRemove,
	localStorageSet,
} from './local-storage';
import {
	sessionStorageRemove,
	sessionStorageSet,
} from './session-storage';

export class Auth {
	static setAuth(
		token: string,
		rememberMe = false,
	) {
		if (rememberMe) {
			sessionStorageRemove('token');
			localStorageSet('token', token);
		} else {
			localStorageRemove('token');
			sessionStorageSet('token', token);
		}
	}

	static deleteAuth() {
		localStorageRemove('token');
		sessionStorageRemove('token');
	}

	static getTokenLocal() {
		return localStorage.getItem('token');
	}

	static getTokenSession() {
		return sessionStorage.getItem('token');
	}

	static getToken() {
		return (
			this.getTokenLocal() ||
			this.getTokenSession()
		);
	}

	static async isAuthedLocal(
		tokenLocal?: string | null,
	) {
		let tl = tokenLocal;
		if (!tl) {
			tl = this.getTokenLocal();
		}

		if (!tl) {
			return false;
		}

		let localValid;
		try {
			localValid = await axios.post(
				API_ROUTES.verifyAuth,
				undefined,
				{
					headers: {
						authorization: `Bearer ${tl}`,
						uniqueId: getUniqueId(),
					},
				},
			);
		} catch (error) {
			console.error(error);
		}

		const is404 =
			localValid?.status ===
			StatusCodes.NOT_FOUND;

		const valid = !!localValid?.data?.data?.valid;

		if (!valid && !is404)
			localStorageRemove('token');

		return valid;
	}

	static async isAuthedSession(
		tokenSession?: string | null,
	) {
		let ts = tokenSession;
		if (!ts) {
			ts = this.getTokenSession();
		}

		if (!ts) {
			return false;
		}

		let sessionValid;
		try {
			sessionValid = await axios.post(
				API_ROUTES.verifyAuth,
				undefined,
				{
					headers: {
						authorization: `Bearer ${ts}`,
						uniqueId: getUniqueId(),
					},
				},
			);
		} catch (error) {
			console.error(error);
		}

		const is404 =
			sessionValid?.status ===
			StatusCodes.NOT_FOUND;

		const valid =
			!!sessionValid?.data?.data?.valid;

		if (!valid && !is404)
			sessionStorageRemove('token');

		return valid;
	}

	static async isAuthed() {
		const tokenLocal = this.getTokenLocal();
		const tokenSession = this.getTokenSession();

		let valid = false;

		if (!tokenLocal && !tokenSession)
			return false;

		if (tokenLocal) {
			valid = await this.isAuthedLocal(
				tokenLocal,
			);
		}

		if (tokenSession && !valid) {
			valid = await this.isAuthedSession(
				tokenSession,
			);
		}

		return valid;
	}
}
