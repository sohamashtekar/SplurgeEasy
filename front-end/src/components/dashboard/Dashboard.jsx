import { Grid } from '@mui/material';
import ExpenseSection from '../expense/ExpenseSection';
import GroupsAndFriendsSection from '../friends/GroupsAndFriendsSection';

function Dashboard() {
    return (
        <Grid container style={{ minHeight: '100%' }}>
            <Grid item xs={12} md={6} style={{ border: '1px dotted lightgrey' }}>
                <ExpenseSection />
            </Grid>
            <Grid item xs={12} md={6} style={{ border: '1px dotted lightgrey' }}>
                <GroupsAndFriendsSection />
            </Grid>
        </Grid>
    );
}

export default Dashboard;
