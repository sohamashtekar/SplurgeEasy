import { Grid } from '@mui/material';
import { UserDataProvider } from '../../context/UserDataProvider';
import ExpenseSection from '../expense/ExpenseSection';
import GroupsAndFriendsSection from '../friends/GroupsAndFriendsSection';

function Dashboard() {
    return (
        <Grid container style={{ minHeight: '100%' }}>
            <UserDataProvider>
                <Grid item xs={12} md={6} style={{ border: '1px dotted lightgrey' }}>
                    <ExpenseSection />
                </Grid>
                <Grid item xs={12} md={6} style={{ border: '1px dotted lightgrey' }}>
                    <GroupsAndFriendsSection />
                </Grid>
            </UserDataProvider>
        </Grid>
    );
}

export default Dashboard;
