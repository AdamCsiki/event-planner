export type AuthState = {
	isLoggedIn: boolean;
	id: number | null;
	name: string | null;
	email: string | null;
	token: string | null;
};
