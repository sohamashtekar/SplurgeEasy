import { Grid, Typography, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import NewExpenseDialog from './NewExpenseDialog';
import { useState } from 'react';

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
                            <Grid item xs={12}></Grid>
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
                                    <span style={{ color: '#00e676', fontWeight: 600 }}>Get</span>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{
                        minHeight: 50,
                        maxHeight: '20%',
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'end',
                    }}
                >
                    <Fab
                        color='primary'
                        variant='extended'
                        size='small'
                        onClick={addExpense}
                        style={{
                            marginRight: 12,
                            marginBottom: 12,
                            width: 115,
                            height: 30,
                            fontSize: 10,
                        }}
                    >
                        <AddIcon fontSize='small' />
                        Add expense
                    </Fab>
                </Grid>
            </Grid>
        </>
    );
};

export default ExpenseSection;
