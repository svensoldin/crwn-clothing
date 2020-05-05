import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDH_cJ-rwsx_u1NFdcwMBx7_gmOqtLN0A0",
    authDomain: "crwn-db-dc896.firebaseapp.com",
    databaseURL: "https://crwn-db-dc896.firebaseio.com",
    projectId: "crwn-db-dc896",
    storageBucket: "crwn-db-dc896.appspot.com",
    messagingSenderId: "724876848769",
    appId: "1:724876848769:web:80f0080618324d1a50a780",
    measurementId: "G-ES3YLV3RSR"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
	const snapShot = await userRef.get();
	if(!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}
	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;