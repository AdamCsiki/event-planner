import { UserModel } from "../../interfaces/UserModel";

export type AuthState = {
	isLoggedIn: boolean;
	token: string | null;
	id: number | null;
	name: string | null;
	email: string | null;
};
