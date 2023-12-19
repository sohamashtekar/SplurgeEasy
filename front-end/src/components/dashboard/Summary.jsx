import {
    ExpenseTitle,
    ExpenseAmountPay,
    ExpenseAmountGet,
} from '../expense/styles/UserBalancesStyles';
import { Grid, Button } from '@mui/material';
import { SummaryTitle } from './styles/SummaryStyles';
import { useState } from 'react';
import NewExpenseDialog from '../expense/NewExpenseDialog';
import useUserData from '../../hooks/useUserData';

const Summary = () => {
    const { userData } = useUserData();
    const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

    const summary = userData?.summary || null;

    const TotalAmount = summary?.total_balance > 0 ? ExpenseAmountGet : ExpenseAmountPay;

    const addExpense = () => {
        setOpenExpenseDialog(true);
    };

    return (
        <>
            {openExpenseDialog && (
                <NewExpenseDialog open={openExpenseDialog} setOpen={setOpenExpenseDialog} />
            )}

            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <Grid item xs={6}>
                    <SummaryTitle>
                        <strong>Summary</strong>
                    </SummaryTitle>
                </Grid>
                <Grid item>
                    <Button
                        variant='outlined'
                        size='small'
                        sx={{ fontSize: '11px' }}
                        onClick={addExpense}
                    >
                        Add expense
                    </Button>
                </Grid>
                {/* <Grid item>
                <Button variant='outlined' size='small' sx={{ fontSize: '11px' }}>
                    Settle Up
                </Button>
            </Grid> */}
                <Grid item xs={12} sx={{ p: 2 }}>
                    <Grid container justifyContent={'space-between'} alignItems={'center'}>
                        <Grid item>
                            <ExpenseTitle>Total Balance</ExpenseTitle>
                            <TotalAmount>
                                {summary?.total_balance > 0 ? 'You get ' : 'You pay '}
                            </TotalAmount>
                            <TotalAmount sx={{ fontWeight: 'bold' }}>
                                ${summary?.total_balance}
                            </TotalAmount>
                        </Grid>
                        <Grid item>
                            <ExpenseTitle>You Owe</ExpenseTitle>
                            <ExpenseAmountPay sx={{ fontWeight: 'bold' }}>
                                ${summary?.expenses_owe}
                            </ExpenseAmountPay>
                        </Grid>
                        <Grid item>
                            <ExpenseTitle>You Get</ExpenseTitle>
                            <ExpenseAmountGet sx={{ fontWeight: 'bold' }}>
                                ${summary?.expenses_owed}
                            </ExpenseAmountGet>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Summary;
