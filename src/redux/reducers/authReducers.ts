import { AuthState } from "../types/AuthState";
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SET_USER,
	REFRESH_SUCCESS,
	REFRESH_FAIL,
	SET_TOKENS,
	LOGOUT,
} from "../types/States";

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
		case SET_USER:
			return {
				...state,
				id: payload.id,
				email: payload.email,
				name: payload.name,
			};
		case REFRESH_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				token: payload.token,
			};
		case REFRESH_FAIL:
			return {
				...state,
				isLoggedIn: false,
				token: null,
			};
		case SET_TOKENS:
			return { ...state, isLoggedIn: true, token: payload.token };
		case LOGOUT:
			return { ...state, ...initialState };
		default: {
			return { ...state };
		}
	}
}
