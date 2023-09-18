import { LoginFormModel } from "../../interfaces/LoginFormModel";
import { basePath } from "../../api/api";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../types/States";

export default function login(loginForm: LoginFormModel) {
	const url = basePath + "/auth/login";

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
				return {
					type: LOGIN_SUCCESS,
					payload: {
						token: data.token,
						id: data.id,
						name: data.name,
						email: data.email,
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
