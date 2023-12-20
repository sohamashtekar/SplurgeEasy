import { Grid, Divider } from '@mui/material';
import ExpenseSection from '../expense/ExpenseSection';
import GroupsAndFriendsSection from '../friends/GroupsAndFriendsSection';
import Summary from './Summary';

function Dashboard() {
    return (
        <Grid container alignContent={'flex-start'} spacing={1}>
            <Grid item xs={12}>
                <Summary />
                <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
                <ExpenseSection />
            </Grid>
            <Grid item xs={12} md={6}>
                <GroupsAndFriendsSection />
            </Grid>
        </Grid>
    );
}

export default Dashboard;
