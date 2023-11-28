import React from 'react';
import Navbar from '../layout/Navbar';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <>
            <Navbar />
            <Grid
                container
                justifyContent={'center'}
                style={{
                    padding: '20',
                    backgroundColor: 'white',
                    height: '100dvh',
                    paddingTop: '10dvh',
                }}
            >
                <Grid item xs={8}>
                    <Grid container>
                        <Grid container xs={6} spacing={2}>
                            <Grid item xs={12}>
                                <Typography variant='h3' style={{ fontWeight: 600 }}>
                                    Spend less, save more, share easily
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='p' style={{ fontWeight: 600 }}>
                                    Manage your money with ease. Split expenses, track spending, and
                                    get tips to save. SplurgeEasy is the ultimate app for smart and
                                    social finance.
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
                        <Grid item xs={6}></Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default LandingPage;
