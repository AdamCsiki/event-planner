import { ReactNode, createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { basePath } from "../api/api";
import { REFRESH_FAIL, REFRESH_SUCCESS } from "../redux/types/States";
import { RootState } from "../redux/store";
import { refreshTokens } from "../redux/actions/authActions";

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
		const newInit: RequestInit = {
			...init,
			mode: "cors",
			credentials: "include",
			headers: {
				...init?.headers,

				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			},
		};

		console.log(newInit);

		return fetch(input, newInit).then((res) => {
			if (res.status === 403) {
				const url = basePath + "/auth/refresh";

				return refreshTokens().then((action) => {
					dispatch(action);

					const token = localStorage.getItem("token");

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
	};

	return (
		<FetchContext.Provider value={{ retryCount: 0, fetchPlus: fetchPlus }}>
			{children}
		</FetchContext.Provider>
	);
}
