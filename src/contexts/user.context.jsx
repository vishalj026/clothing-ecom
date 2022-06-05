import { createContext, useState, useEffect } from 'react';

import { authStateChangeListener, createUserDocFromAuth } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {}
});

export const UserContextProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const value = {
        currentUser,
        setCurrentUser
    };

    useEffect(() => {
        const unsubscribe = authStateChangeListener((user) => {
            // console.log(user);
            if(user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;     //calls this when unmounting
    }, []);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}