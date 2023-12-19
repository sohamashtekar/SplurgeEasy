import { ExpenseTitle, ExpenseAmountPay, ExpenseAmountGet } from './styles/UserBalancesStyles';
import { Grid, Typography } from '@mui/material';
import useUserData from '../../hooks/useUserData';

const AmountOwed = ({ expenseItem }) => {
    const { display_name, balance } = expenseItem;

    return (
        <>
            <Grid item xs={12} sx={{ pt: 1 }}>
                <Grid container alignItems='center'>
                    <Grid item xs={12} sx={{ m: 1 }}>
                        <ExpenseTitle>{display_name}</ExpenseTitle>
                        <ExpenseAmountPay>you owe </ExpenseAmountPay>
                        <ExpenseAmountPay sx={{ fontWeight: 'bold' }}>
                            ${Math.abs(balance)}
                        </ExpenseAmountPay>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

const AmountOwes = ({ expenseItem }) => {
    const { display_name, balance } = expenseItem;

    return (
        <>
            <Grid item xs={12} sx={{ pt: 1 }}>
                <Grid container alignItems='center'>
                    <Grid item xs={12} sx={{ m: 1 }}>
                        <ExpenseTitle>{display_name}</ExpenseTitle>
                        <ExpenseAmountGet>you get </ExpenseAmountGet>
                        <ExpenseAmountGet sx={{ fontWeight: 'bold' }}>
                            ${Math.abs(balance)}
                        </ExpenseAmountGet>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

const ExpenseSection = () => {
    const { userData } = useUserData();

    const amountUserGets = userData.friends?.filter((item) => parseFloat(item.balance) > 0) || [];
    const amountUserPays = userData.friends?.filter((item) => parseFloat(item.balance) < 0) || [];

    return (
        <>
            <Grid container style={{ padding: 2, height: '100%' }}>
                <Grid item xs={12} style={{ minHeight: '80%' }}>
                    <Grid container direction={'row'}>
                        <Grid item xs={6} style={{ padding: 1 }}>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                                <Typography
                                    variant='h5'
                                    component='div'
                                    style={{ fontWeight: 500 }}
                                >
                                    <span style={{ color: 'black' }}>You </span>
                                    <span style={{ color: '#f44336', fontWeight: 600 }}>Pay</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {amountUserPays.map((item) => (
                                    <AmountOwed key={item.id} expenseItem={item} />
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={6} style={{ padding: 1 }}>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: '#e0e0e0',
                                }}
                            >
                                <Typography
                                    variant='h5'
                                    component='div'
                                    style={{ fontWeight: 500 }}
                                >
                                    <span style={{ color: 'black' }}>You </span>
                                    <span style={{ color: '#5bc5a7', fontWeight: 600 }}>Get</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {amountUserGets.map((item) => (
                                    <AmountOwes key={item.id} expenseItem={item} />
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ExpenseSection;
