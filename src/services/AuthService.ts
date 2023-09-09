import { basePath } from "../api/api";

class AuthService {
	login(email: string, password: string) {
		const url = basePath + "/login";

		return fetch(url, {
			method: "POST",
			body: JSON.stringify({ email, password }),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				return data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	register(name: string, email: string, password: string) {}
}
