import { Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';
import NewExpenseDialog from './NewExpenseDialog';
import ReceiptIcon from '@mui/icons-material/Receipt';
import useUserData from '../../hooks/useUserData';
import { ExpenseTitle, ExpenseAmountPay, ExpenseAmountGet } from './styles/UserBalancesStyles';

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
    const [openExpenseDialog, setOpenExpenseDialog] = useState(false);
    const { userData } = useUserData();

    const amountUserGets = userData.friends?.filter((item) => parseFloat(item.balance) > 0) || [];
    const amountUserPays = userData.friends?.filter((item) => parseFloat(item.balance) < 0) || [];

    const addExpense = () => {
        setOpenExpenseDialog(true);
    };

    return (
        <>
            {openExpenseDialog && (
                <NewExpenseDialog open={openExpenseDialog} setOpen={setOpenExpenseDialog} />
            )}

            <Grid container style={{ padding: 2, height: '100%' }}>
                <Grid item xs={12} style={{ minHeight: '80%' }}>
                    <Grid container direction={'row'}>
                        <Grid item xs={5} style={{ padding: 1 }}>
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
                        <Grid item xs={5} style={{ padding: 1 }}>
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
                                    <span style={{ color: '#00e676', fontWeight: 600 }}>Get</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                {amountUserGets.map((item) => (
                                    <AmountOwes key={item.id} expenseItem={item} />
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={2} style={{ padding: 1 }}>
                            <Grid
                                item
                                xs={12}
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: '#e0e0e0',
                                    paddingBottom: 1,
                                }}
                            >
                                <Button
                                    sx={{ color: 'black' }}
                                    size='small'
                                    startIcon={<ReceiptIcon />}
                                    onClick={addExpense}
                                >
                                    Add
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default ExpenseSection;
