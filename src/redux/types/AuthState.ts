import { User } from "firebase/auth";

export type AuthState = {
	isLoggedIn: boolean;
	user: User | null;
};
