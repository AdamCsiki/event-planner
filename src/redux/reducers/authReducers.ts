import { AuthState } from "../types/AuthState";

const initialState: AuthState = {
	isLoggedIn: false,
	id: null,
	userId: null,
	name: null,
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
				id: payload.id,
				userId: payload.userId,
				name: payload.name,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				id: null,
				userId: null,
				name: null,
			};
		default: {
			return { ...state };
		}
	}
}
