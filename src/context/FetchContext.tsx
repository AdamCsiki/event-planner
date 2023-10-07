import { ReactNode, createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { basePath } from "../api/api";
import { REFRESH_FAIL, REFRESH_SUCCESS } from "../redux/types/States";
import { RootState } from "../redux/store";

interface ExtendedProps {
	children: ReactNode;
	value: {
		retryCount: number;
		fetchPlus: (
			input: RequestInfo | URL,
			init?: RequestInit | undefined
		) => Promise<Response>;
	};
}

export const FetchContext = createContext<{
	retryCount: number;
	fetchPlus: (
		input: RequestInfo | URL,
		init?: RequestInit | undefined
	) => Promise<Response>;
}>({
	retryCount: 0,
	fetchPlus: (input, init) => new Promise((resolve) => {}),
});

export default function FetchProvider(props: ExtendedProps) {
	const { children, value } = props;

	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const fetchPlus = async (
		input: RequestInfo | URL,
		init?: RequestInit | undefined
	): Promise<Response> => {
		// TODO NEED TO ENABLE CREDENTIALS IN SPRINGBOOT
		const newInit: RequestInit = {
			...init,
			headers: {
				...init?.headers,
				credentials: "include",
				Authentication: `Bearer ${auth.token}`,
			},
		};

		return fetch(input, newInit).then((res) => {
			if (res.status === 498) {
				const url = basePath + "/auth/refresh";

				return fetch(url, newInit)
					.then((res) => {
						return res.json();
					})
					.then((data) => {
						console.log("Refreshed ", data.token);
						dispatch({
							type: REFRESH_SUCCESS,
							payload: {
								token: data.token,
							},
						});

						return fetch(input, {
							...newInit,
							headers: {
								...newInit?.headers,
								Authentication: `Bearer ${data.token}`,
							},
						});
					})
					.catch((err) => {
						console.error(err);

						dispatch({ type: REFRESH_FAIL });

						return new Promise(err);
					});
			}

			return res;
		});
	};

	return (
		<FetchContext.Provider value={{ retryCount: 0, fetchPlus: fetchPlus }}>
			{children}
		</FetchContext.Provider>
	);
}
