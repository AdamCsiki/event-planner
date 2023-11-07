import { basePath } from "../api/api";
import { LoginFormModel } from "../interfaces/LoginFormModel";
import { RegisterFormModel } from "../interfaces/RegisterFormModel";
import {
	DEFAULT,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	SET_USER,
	SET_TOKENS,
	REFRESH_FAIL,
	REFRESH_SUCCESS,
} from "../redux/types/States";
import { store } from "../redux/store";
import { fetchPlus } from "../api/fetchPlus";
import { auth, googleProvider } from "../config/firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";

export function login(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password);
}

export function loginWithGoogle() {
	return signInWithPopup(auth, googleProvider);
}

export function register(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
	return signOut(auth);
}
