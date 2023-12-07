import { Grid, Typography, Fab, Button } from '@mui/material';
import { useState } from 'react';
// import NewExpenseDialog from './NewExpenseDialog';
import ReceiptIcon from '@mui/icons-material/Receipt';

const ExpenseSection = () => {
    const [openExpenseDialog, setOpenExpenseDialog] = useState(false);

    const addExpense = () => {
        setOpenExpenseDialog(true);
    };

    return (
        <>
            {/* <NewExpenseDialog open={openExpenseDialog} setOpen={setOpenExpenseDialog} /> */}

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
                            <Grid item xs={12}></Grid>
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
                            <Grid item xs={12}></Grid>
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
