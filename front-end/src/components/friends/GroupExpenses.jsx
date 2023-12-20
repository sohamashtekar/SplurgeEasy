import { Grid, Typography, IconButton, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import useUserData from '../../hooks/useUserData';
import textClasses from '../generic/styles/TextStyling.module.css';

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

    const ExpenseAmountColor = didCurrentUserPay ? '#5BC5A7' : '#F44336';

    return (
        <Grid item xs={12} sx={{ pt: 1 }}>
            <Grid container justifyContent={'space-between'} alignItems={'flex-start'}>
                <Grid item>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div className={textClasses.subValueText}>{creation_mon}</div>
                        <div className={textClasses.subValueText}>{creation_day}</div>
                    </Typography>
                </Grid>
                <Divider orientation='vertical' flexItem />
                <Grid item>
                    <div className={textClasses.subValueText}>{description}</div>
                </Grid>
                <Divider orientation='vertical' flexItem />
                <Grid item>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>
                            <span className={textClasses.subValueText}>
                                {didCurrentUserPay ? 'You paid' : paid_by.display_name}
                            </span>
                        </div>
                        <div className={textClasses.subValueText}>
                            {didCurrentUserPay ? `$${total_amount}` : `paid: ${total_amount}`}
                        </div>
                    </Typography>
                </Grid>
                <Divider orientation='vertical' flexItem />
                <Grid item>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div className={textClasses.subValueText}>
                            {didCurrentUserPay ? 'You Get' : 'You Pay'}
                        </div>
                        <div
                            className={textClasses.subValueText}
                            style={{ color: ExpenseAmountColor }}
                        >
                            ${currentUserAmt}
                        </div>
                    </Typography>
                </Grid>
                <Divider orientation='vertical' flexItem />
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
