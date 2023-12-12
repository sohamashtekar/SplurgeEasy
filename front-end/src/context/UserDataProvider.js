import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchUserData from '../react-query/fetch-user-data';
import LoadingBackdrop from '../components/generic/LoadingBackdrop';

const UserDataContext = createContext({});

export const UserDataProvider = ({ children }) => {
    const userDataQuery = useQuery({ queryKey: ['userData'], queryFn: fetchUserData });
    const userData = userDataQuery.data ? userDataQuery.data : [];
    const loading = userDataQuery.isFetching;

    return (
        <UserDataContext.Provider value={{ userData, userDataQuery }}>
            <LoadingBackdrop open={loading} />
            {children}
        </UserDataContext.Provider>
    );
};

export default UserDataContext;
