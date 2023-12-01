import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Grid, Typography } from '@mui/material';

const Missing = () => {
    const { auth } = useAuth();

    return (
        <Grid
            container
            style={{
                backgroundColor: 'lightgrey',
                minHeight: '100%',
            }}
            justifyContent={'center'}
            alignItems={'center'}
            spacing={0}
        >
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography variant='h1'>Oops!</Typography>
                <Typography variant='p'>404 - Page Not Found</Typography>
                <Grid item xs={12}>
                    {auth?.email ? (
                        <Link to='/dashboard'>Visit Dashboard</Link>
                    ) : (
                        <Link to='/'>Visit Our Homepage</Link>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Missing;
