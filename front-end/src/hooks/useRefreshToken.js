import axios from '../api/axios';
import useAuth from './useAuth';
import { tokenRefreshAPI } from '../api/api';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axios.get(tokenRefreshAPI, {
                withCredentials: true,
            });
            setAuth((prev) => {
                return { ...prev, accessToken: response.data.accessToken };
            });
            return response.data.accessToken;
        } catch (err) {
            console.log(err);
        }
    };
    return refresh;
};

export default useRefreshToken;
