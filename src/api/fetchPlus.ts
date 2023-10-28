import { basePath } from "./api";

const refreshURL = basePath + "/auth/refresh";

export function setCookie(
	name: string,
	value: string | null,
	expires?: number
) {
	var date = new Date();

	date.setTime(
		date.getTime() +
			(expires == undefined ? 10 * 24 * 60 * 60 * 1000 : expires)
	);

	console.log("Cookie value: ", value);

	document.cookie =
		`${name}=` +
		value +
		"; expires=" +
		date.toUTCString() +
		"; path=/project-planner; SameSite=None";
}

export function getCookie(name: string) {
	let cookies = document.cookie;

	const cookie_array = cookies.split(";");

	let cookie = cookie_array.find((value) => {
		return value.includes(name);
	});

	if (cookie) {
		console.log(cookie);
		return cookie.substring(name.length + 2);
	}

	return "";
}

export function removeCookie(name: string) {
	document.cookie = `${name}=; Path=/project-planner; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'`;
}

export function fetchPlus(
	input: RequestInfo | URL,
	init?: RequestInit | undefined
): Promise<Response> {
	const currentToken = localStorage.getItem("token");
	// const currentRefresh = getCookie("refresh");

	const newInit: RequestInit = {
		...init,
		mode: "cors",
		credentials: "include",
		headers: {
			...init?.headers,

			"Content-Type": "application/json",
			Authorization: `Bearer ${currentToken}`,
		},
	};

	return fetch(input, newInit).then((res) => {
		if (res.status === 403) {
			removeCookie("token");
			removeCookie("refresh");

			return fetch(refreshURL, {
				method: "POST",
				mode: "cors",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
			})
				.then((res) => res.json())
				.then((data) => {
					const { token, refresh } = data;

					localStorage.setItem("refresh", refresh);
					localStorage.setItem("token", token);

					return fetch(input, {
						...newInit,
						headers: {
							...newInit?.headers,
							Authorization: `Bearer ${token}`,
						},
					});
				});
		}

		return res;
	});
}
