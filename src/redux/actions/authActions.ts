import { LoginFormModel } from "../../interfaces/LoginFormModel";
import { basePath } from "../../api/api";
import {
	DEFAULT,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	SET_USER,
} from "../types/States";
import { RegisterFormModel } from "../../interfaces/RegisterFormModel";

export function login(loginForm: LoginFormModel) {
	const url = basePath + "/auth/login";

	console.log(url);

	return fetch(url, {
		method: "POST",
		body: JSON.stringify(loginForm),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.token) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("refresh", data.refresh);

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

export function register(registerForm: RegisterFormModel) {
	const url = basePath + "/auth/register";

	return fetch(url, {
		method: "POST",
		body: JSON.stringify(registerForm),
		headers: { "Content-Type": "application/json" },
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			if (data.token) {
				localStorage.setItem("token", data.token);
				localStorage.setItem("refresh", data.refresh);

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

	return {
		type: LOGOUT,
	};
}

export function refreshTokens() {}

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
