import { LoginFormModel } from "../../interfaces/LoginFormModel";
import { basePath } from "../../api/api";
import {
	DEFAULT,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	SET_USER,
	SET_TOKENS,
	REFRESH_FAIL,
	REFRESH_SUCCESS,
} from "../types/States";
import { RegisterFormModel } from "../../interfaces/RegisterFormModel";
import { setCookie } from "../../api/fetchPlus";

export function login(loginForm: LoginFormModel) {
	const url = basePath + "/auth/login";

	console.log(url);

	return fetch(url, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify(loginForm),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const { refresh, token } = data;

			if (token) {
				localStorage.setItem("token", token);
				localStorage.setItem("refresh", refresh);

				return {
					type: LOGIN_SUCCESS,
					payload: {
						token: token,
					},
				};
			}

			return {
				type: LOGIN_FAIL,
			};
		})
		.catch((err) => {
			console.error(err);

			return {
				type: LOGIN_FAIL,
			};
		});
}

export function register(registerForm: RegisterFormModel) {
	const url = basePath + "/auth/register";

	return fetch(url, {
		method: "POST",
		body: JSON.stringify(registerForm),
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const { refresh, token } = data;

			if (token) {
				localStorage.setItem("token", token);
				localStorage.setItem("refresh", refresh);

				return {
					type: LOGIN_SUCCESS,
					payload: {
						token: data.token,
					},
				};
			}

			return {
				type: LOGIN_FAIL,
			};
		})
		.catch((err) => {
			console.error(err);

			return {
				type: LOGIN_FAIL,
			};
		});
}

export function logout() {
	localStorage.removeItem("token");
	localStorage.removeItem("refresh");

	// Clearing the cookie by sending it back in time
	document.cookie =
		"refresh=; Path=/project-planner; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'";

	return {
		type: LOGOUT,
	};
}

export function refreshTokens() {
	return fetch(basePath + "/auth/refresh", {
		method: "POST",
		credentials: "include",
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			const { refresh, token } = data;

			if (token) {
				localStorage.setItem("token", token);
				localStorage.setItem("refresh", refresh);

				return {
					type: REFRESH_SUCCESS,
					payload: {
						token: token,
					},
				};
			}

			return {
				type: REFRESH_FAIL,
			};
		})
		.catch((err) => {
			console.error(err);

			return {
				type: REFRESH_FAIL,
			};
		});
}

export function getUserByToken(token: string) {
	const url = basePath + "/users/user/token";

	return fetch(url, {
		method: "GET",
		headers: {
			Authentication: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log(JSON.stringify(data));
			return {
				type: SET_USER,
				payload: {
					id: data.id,
					name: data.name,
					email: data.email,
				},
			};
		})
		.catch((err) => {
			console.error(err);

			return {
				type: DEFAULT,
			};
		});
}

export function isBackendOnline() {
	const url = basePath + "/auth/online";

	return fetch(url, { method: "GET" })
		.then((res) => res.json())
		.then((data) => {
			return data.isOnline;
		});
}
