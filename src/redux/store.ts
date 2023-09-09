import { configureStore } from "@reduxjs/toolkit";
import { reduxLogger } from "./logger";
import rootReducer from "./reducers";

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}).concat(reduxLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

function select(state: RootState) {
	return state;
}

let currentValue: any;

store.subscribe(() => {
	let previousValue = currentValue;

	currentValue = select(store.getState());

	if (previousValue != currentValue) {
		console.log(
			"Some deep nested property in auth changed from\n",
			previousValue,
			"\nto\n",
			currentValue
		);
	}
});
