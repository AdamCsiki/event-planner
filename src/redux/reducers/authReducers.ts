import { AuthState } from "../types/AuthState";
import { LOGIN_SUCCESS, LOGIN_FAIL } from "../types/States";

const initialState: AuthState = {
	isLoggedIn: false,
	id: null,
	name: null,
	email: null,
	token: null,
};

export default function authReducer(
	state = initialState,
	action: { type: string; payload: AuthState }
) {
	const { type, payload } = action;

	switch (type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				token: payload.token,
				id: payload.id,
				name: payload.name,
				email: payload.email,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				token: null,
				id: null,
				name: null,
				email: null,
			};
		default: {
			return { ...state };
		}
	}
}
