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
import { auth, db, googleProvider } from "../config/firebase";
import {
	UserCredential,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

export const usersCollectionRef = (userId: any) =>
	collection(db, "users", userId);

export function login(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password).then((cred) => {
		createUserRequest(cred);
	});
}

export function loginWithGoogle() {
	return signInWithPopup(auth, googleProvider).then((cred) => {
		createUserRequest(cred);
	});
}

export function register(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password).then(
		(cred) => {
			createUserRequest(cred);
		}
	);
}

export function logout() {
	return signOut(auth);
}

export function createUserRequest(cred: UserCredential) {
	return setDoc(doc(db, "users", cred.user.uid), {
		name: cred.user.displayName ?? cred.user.email,
	});
}
