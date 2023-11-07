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
import { User } from "firebase/auth";

const initialState: AuthState = {
	isLoggedIn: true,
	user: null,
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
				user: payload.user,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		case LOGOUT:
			return { ...state, ...initialState, isLoggedIn: false, user: null };
		default: {
			return { ...state };
		}
	}
}
