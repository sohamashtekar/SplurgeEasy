import { useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function LandingPage() {
    const navigate = useNavigate();

    const { auth } = useAuth();

    useEffect(() => {
        auth?.accessToken && navigate('/dashboard');
    }, [auth]);

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <>
            <Grid
                container
                justifyContent={'center'}
                style={{
                    backgroundColor: 'white',
                    paddingTop: '10dvh',
                    minHeight: '100%',
                }}
            >
                <Grid item xs={11} lg={8}>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h3' style={{ fontWeight: 600 }}>
                                        Spend less, save more, share easily
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='p' style={{ fontWeight: 600 }}>
                                        Manage your money with ease.
                                        <br /> Split expenses, track spending, and get tips to save.
                                        <br />
                                        SplurgeEasy is the ultimate app for smart and social
                                        finance.
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        onClick={handleSignUp}
                                        variant='contained'
                                        style={{
                                            backgroundColor: '#424242',
                                        }}
                                    >
                                        Sign Up
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={6}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default LandingPage;
