import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchExpenseDetails from '../../react-query/fetch-expense-details';
import Expense from './Expense';

const AddExpense = () => {
    return (
        <>
            <Expense />
        </>
    );
};

const EditExpense = ({ expenseID }) => {
    const expenseDetailsQuery = useQuery({
        queryKey: ['expenseDetails', { expense_id: expenseID }],
        queryFn: fetchExpenseDetails,
    });
    const expenseDetailsData = expenseDetailsQuery.data ? expenseDetailsQuery.data : [];
    const loading = expenseDetailsQuery.isFetching;

    return (
        <>
            <Expense expenseDetails={expenseDetailsData} />
        </>
    );
};

const AddOrEditExpense = () => {
    const { expenseID } = useParams();

    return expenseID ? <EditExpense expenseID={expenseID} /> : <AddExpense />;
};

export default AddOrEditExpense;
