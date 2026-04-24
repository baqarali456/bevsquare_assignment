'use client';

import { createContext, useContext, useState } from 'react';


 const UserContext = createContext();

 const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);


    return (
        <UserContext.Provider value={{ users, setUsers}}>
            {children}
        </UserContext.Provider>
    );
}

 const useUserContext = () => useContext(UserContext);
 export {
    UserProvider,
    useUserContext,
    
 }