import {initializeApp} from 'firebase/app';
import {getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD-ogt4Q2sLZSEW0Z5tQFzXwQLYIxPs-bY",
    authDomain: "crwn-clothing-db-55c3e.firebaseapp.com",
    projectId: "crwn-clothing-db-55c3e",
    storageBucket: "crwn-clothing-db-55c3e.appspot.com",
    messagingSenderId: "451778623658",
    appId: "1:451778623658:web:f4ac3bc3d44b195b03b8d3"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: 'select_account'
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if user does not exist, create/set document
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdOn = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdOn,
                ...additionalInfo
            });
        }

        catch(e) {
            console.log('error creating the user', e);
        }
    }

    return userDocRef;
  }

  export const createAuthUserFromEmailAndPassword = async (email, password) => {
      if(!email || !password) return;

      const userAuth = await createUserWithEmailAndPassword(auth, email, password);
      return userAuth;
  }