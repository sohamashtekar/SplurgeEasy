import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchUserData from '../react-query/fetch-user-data';

const UserDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
    const userDataQuery = useQuery({ queryKey: ['userData'], queryFn: fetchUserData });
    const userData = userDataQuery.data ? userDataQuery.data : [];

    return (
        <UserDataContext.Provider value={{ userData, userDataQuery }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataContext;
