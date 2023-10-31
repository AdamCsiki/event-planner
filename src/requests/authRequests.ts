import { basePath } from "../api/api";
import { LoginFormModel } from "../interfaces/LoginFormModel";
import { RegisterFormModel } from "../interfaces/RegisterFormModel";
import {
	DEFAULT,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	SET_USER,
	SET_TOKENS,
	REFRESH_FAIL,
	REFRESH_SUCCESS,
} from "../redux/types/States";
import { store } from "../redux/store";
import { fetchPlus } from "../api/fetchPlus";

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
				store.dispatch({
					type: LOGIN_SUCCESS,
					payload: {
						token: token,
					},
				});
			}

			store.dispatch({
				type: LOGIN_FAIL,
			});
		})
		.catch((err) => {
			store.dispatch({
				type: LOGIN_FAIL,
			});
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
				store.dispatch({
					type: LOGIN_SUCCESS,
					payload: {
						token: data.token,
					},
				});
			}

			store.dispatch({
				type: LOGIN_FAIL,
			});
		})
		.catch((err) => {
			store.dispatch({
				type: LOGIN_FAIL,
			});
		});
}

export function logout() {
	localStorage.removeItem("token");
	localStorage.removeItem("refresh");

	// Clearing the cookie by sending it back in time
	document.cookie =
		"refresh=; Path=/project-planner; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'";

	store.dispatch({
		type: LOGOUT,
	});
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

				store.dispatch({
					type: REFRESH_SUCCESS,
					payload: {
						token: token,
					},
				});
			}

			store.dispatch({
				type: REFRESH_FAIL,
			});
		})
		.catch((err) => {
			store.dispatch({
				type: REFRESH_FAIL,
			});
		});
}

export function getUserByToken(token: string) {
	const url = basePath + "/users/user/token";

	return fetchPlus(url, {
		method: "GET",
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			store.dispatch({
				type: SET_USER,
				payload: {
					id: data.id,
					name: data.name,
					email: data.email,
				},
			});
		})
		.catch((err) => {
			store.dispatch({
				type: DEFAULT,
			});
		});
}
