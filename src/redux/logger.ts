import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";

export const reduxLogger: Middleware =
	(store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
		console.log("dispatching:", action);

		let result = next(action);

		console.log("next state:", store.getState());

		return result;
	};
