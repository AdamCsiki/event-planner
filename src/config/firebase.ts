import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
	GoogleAuthProvider,
	getAuth,
	connectAuthEmulator,
} from "firebase/auth";
import {
	CACHE_SIZE_UNLIMITED,
	Firestore,
	connectFirestoreEmulator,
	enablePersistentCacheIndexAutoCreation,
	getFirestore,
	initializeFirestore,
	memoryLocalCache,
	persistentLocalCache,
	persistentMultipleTabManager,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
	apiKey: "AIzaSyARM00asI-XNMoDunI4Ge2f9_AUI54fjDU",

	authDomain: "project-planner-38230.firebaseapp.com",

	projectId: "project-planner-38230",

	storageBucket: "project-planner-38230.appspot.com",

	messagingSenderId: "954564791743",

	appId: "1:954564791743:web:647e3856d8d09dcbdea50a",

	measurementId: "G-J49SS6Q9GK",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const firestore = initializeFirestore(app, {
	localCache: persistentLocalCache({
		tabManager: persistentMultipleTabManager(),
	}),
});

// const analytics = getAnalytics(app);

// export const auth = getAuth(app);

export const db = getFirestore(app);
// connectFirestoreEmulator(db, "127.0.0.1", 8080);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
