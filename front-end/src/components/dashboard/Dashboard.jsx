import { Grid } from '@mui/material';

function Dashboard() {
    return (
        <Grid
            container
            style={{
                backgroundColor: 'darkgray',
                minHeight: '100%',
            }}
            justifyContent={'center'}
            alignItems={'center'}
        >
            {'Welcome to SplurgeEasy!'}
        </Grid>
    );
}

export default Dashboard;
