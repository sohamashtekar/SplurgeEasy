import { Grid, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useUserData from '../../hooks/useUserData';

const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
];

const GroupExpenseRow = ({ expenseItem, editExpense, currentUser }) => {
    const { id, paid_by, created_on, total_amount, description, split_details } = expenseItem;

    const parsedTotalAmt = parseFloat(total_amount).toFixed(2);
    const expense_creation_date = new Date(created_on);
    const creation_day = expense_creation_date.getDate();
    const creation_mon = month[expense_creation_date.getMonth()];

    const didCurrentUserPay = paid_by.id === currentUser.id;

    const currentUserSplit = split_details.find((item) => item.user === currentUser.id);
    const currentUserSplitAmt = currentUserSplit.calculated_amount;
    const currentUserAmt = didCurrentUserPay
        ? parsedTotalAmt - Math.abs(currentUserSplitAmt)
        : currentUserSplitAmt;

    return (
        <Grid item xs={12} sx={{ pt: 1 }}>
            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <Grid item>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>{creation_mon}</div>
                        <div style={{ fontSize: '10px' }}>{creation_day}</div>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>{description}</div>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>
                            {didCurrentUserPay ? 'You paid' : paid_by.display_name}
                            <span style={{ fontSize: '10px' }}></span>
                        </div>
                        <div style={{ fontSize: '10px' }}>
                            {didCurrentUserPay ? `$${total_amount}` : `paid: ${total_amount}`}
                        </div>
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>{didCurrentUserPay ? 'You Get' : 'You Pay'}</div>
                        <div style={{ fontSize: '10px' }}>${currentUserAmt}</div>
                    </Typography>
                </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton
                        color='error'
                        size='small'
                        onClick={() => {
                            editExpense(id);
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

const GroupExpenses = (props) => {
    const { groupDetails } = props;
    const groupExpenses = groupDetails?.balances || [];

    const { userData } = useUserData();
    const currentUser = userData?.user_info;

    const editExpense = (memberID) => {
        console.log(memberID);
    };

    return (
        <>
            <Grid item xs={12} sx={{ mt: 1, pl: 1, pr: 1 }}>
                {groupExpenses.map((expense) => (
                    <GroupExpenseRow
                        key={expense.id}
                        expenseItem={expense}
                        editExpense={editExpense}
                        currentUser={currentUser}
                    />
                ))}
            </Grid>
        </>
    );
};

export default GroupExpenses;
