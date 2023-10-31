import { basePath } from "./../api/api";
import { fetchPlus } from "../api/fetchPlus";

export const isOnline = () => {
	const url = basePath + "/auth/online";

	return fetchPlus(url, { method: "GET" })
		.then((res) => {
			return true;
		})
		.catch((err) => {
			return false;
		});
};
