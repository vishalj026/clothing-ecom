import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged 
} from 'firebase/auth';
import {getFirestore, doc, getDoc, setDoc,
collection,
writeBatch,
query,
getDocs
} from 'firebase/firestore';

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
  export const db = getFirestore();
  
  //REGION - User Authentication
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

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

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    const userAuth = await signInWithEmailAndPassword(auth, email, password);
      return userAuth;
  }

  export const signOutUser = async () => {
      return await signOut(auth);
  }

  export const authStateChangeListener = (callback) => {
    return onAuthStateChanged(auth, callback);
  }

  //ENDREGION - User Authentication

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
      const collectionRef = collection(db, collectionKey);
      const batch = writeBatch(db);

      objectsToAdd.forEach((obj) => {
          const docRef = doc(collectionRef, obj.title.toLowerCase());
          batch.set(docRef, obj);
      })

      await batch.commit();
      console.log('done');
  } 

  export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;

        return acc;
    }, {});

    return categoryMap;
  }
  //Region - Categories
