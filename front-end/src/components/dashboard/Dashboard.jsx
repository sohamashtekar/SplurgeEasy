import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import AuthContext from '../context/AuthProvider';

function Dashboard() {
    const { auth } = useContext(AuthContext);

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
