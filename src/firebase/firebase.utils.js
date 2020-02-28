import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAJf3NrIC4Oka0d6SuumHSxVnzHzQz_jPM",
    authDomain: "crwn-db-b7917.firebaseapp.com",
    databaseURL: "https://crwn-db-b7917.firebaseio.com",
    projectId: "crwn-db-b7917",
    storageBucket: "crwn-db-b7917.appspot.com",
    messagingSenderId: "400321137889",
    appId: "1:400321137889:web:5e2b53768f2e7ebba0bba0",
    measurementId: "G-Y4P4XHTC12"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        }
        catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
