import { Grid } from '@mui/material';
import useUserData from '../../hooks/useUserData';
import textClasses from '../generic/styles/TextStyling.module.css';

const AmountOwed = ({ expenseItem }) => {
    const { display_name, balance } = expenseItem;

    return (
        <>
            <Grid item xs={12} sx={{ pt: 1 }}>
                <Grid container alignItems='center'>
                    <Grid item xs={12} sx={{ m: 1 }}>
                        <div className={textClasses.nameHeader}>{display_name}</div>
                        <span className={textClasses.subValueText} style={{ color: '#F44336' }}>
                            you owe ${Math.abs(balance)}
                        </span>
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
                        <div className={textClasses.nameHeader}>{display_name}</div>
                        <span className={textClasses.subValueText} style={{ color: '#5BC5A7' }}>
                            you get ${Math.abs(balance)}
                        </span>
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
                                    backgroundColor: '#E0E0E0',
                                }}
                            >
                                <span className={textClasses.sectionHeader}>
                                    <span style={{ color: 'black' }}>You </span>
                                    <span style={{ color: '#f44336', fontWeight: 600 }}>Pay</span>
                                </span>
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
                                    backgroundColor: '#E0E0E0',
                                }}
                            >
                                <span className={textClasses.sectionHeader}>
                                    <span style={{ color: 'black' }}>You </span>
                                    <span style={{ color: '#5bc5a7', fontWeight: 600 }}>Get</span>
                                </span>
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
