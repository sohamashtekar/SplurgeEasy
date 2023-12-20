import { Grid, Button } from '@mui/material';
import { useState } from 'react';
import NewExpenseDialog from '../expense/NewExpenseDialog';
import useUserData from '../../hooks/useUserData';
import textClasses from '../generic/styles/TextStyling.module.css';
import ReceiptIcon from '@mui/icons-material/Receipt';

const Summary = () => {
    const { userData } = useUserData();
    const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

    const summary = userData?.summary || null;

    const TotalAmountColor = summary?.total_balance > 0 ? '#5BC5A7' : '#F44336';

    const addExpense = () => {
        setOpenExpenseDialog(true);
    };

    return (
        <>
            {openExpenseDialog && (
                <NewExpenseDialog open={openExpenseDialog} setOpen={setOpenExpenseDialog} />
            )}

            <Grid container justifyContent={'space-between'} alignItems={'center'}>
                <Grid item xs={12}>
                    <Grid
                        container
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        sx={{ backgroundColor: '#E0E0E0', p: '2px' }}
                    >
                        <Grid item xs={6}>
                            <span className={textClasses.sectionHeader}>Summary</span>
                        </Grid>
                        <Grid item>
                            <Button
                                className={textClasses.btnText}
                                sx={{ color: 'black' }}
                                onClick={addExpense}
                                startIcon={<ReceiptIcon />}
                            >
                                Add expense
                            </Button>
                        </Grid>
                        {/* <Grid item>
                            <Button variant='outlined' size='small' sx={{ fontSize: '11px' }}>
                                Settle Up
                            </Button>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ p: 1 }}>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item>
                            <div className={textClasses.subHeader}>Total Balance</div>
                            <span
                                className={textClasses.subValueText}
                                style={{ color: TotalAmountColor }}
                            >
                                ${summary?.total_balance}
                            </span>
                        </Grid>
                        <Grid item>
                            <div className={textClasses.subHeader}>You Owe</div>
                            <span className={textClasses.subValueText} style={{ color: '#F44336' }}>
                                ${summary?.expenses_owe}
                            </span>
                        </Grid>
                        <Grid item>
                            <div className={textClasses.subHeader}>You Get</div>
                            <span className={textClasses.subValueText} style={{ color: '#5BC5A7' }}>
                                ${summary?.expenses_owed}
                            </span>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Summary;
