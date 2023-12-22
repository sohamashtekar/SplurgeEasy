import { expenseDetailsAPI } from '../api/api';
import { axiosPrivate } from '../api/axios';

const fetchExpenseDetails = async ({ queryKey }) => {
    const params = queryKey[1] || {};
    const apiRes = await axiosPrivate.get(expenseDetailsAPI, { params: params });

    if (!apiRes.statusText === 'OK') {
        throw new Error(`details/fetch not ok`);
    }

    return apiRes.data;
};

export default fetchExpenseDetails;
