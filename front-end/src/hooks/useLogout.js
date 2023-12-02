import useAxiosPrivate from './useAxiosPrivate';
import useAuth from './useAuth';
import { logoutAPI } from '../api/api';

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate();
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            await axiosPrivate.get(logoutAPI, {
                withCredentials: true,
            });
        } catch (err) {
            console.error(err);
        }
    };

    return logout;
};

export default useLogout;
