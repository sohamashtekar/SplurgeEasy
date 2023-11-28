import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import Navbar from '../layout/Navbar';
import { useNavigate } from 'react-router-dom';

function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const initiateLogIn = () => {};

    return (
        <>
            <Navbar />
            <Grid
                container
                style={{
                    padding: '20',
                    backgroundColor: 'darkgray',
                    height: '91dvh',
                }}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Grid item>
                    <Paper
                        elevation={3}
                        style={{
                            width: '50dvw',
                        }}
                    >
                        <Grid container style={{ padding: '7%' }} spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant='h5' style={{ fontWeight: 600 }}>
                                    Log In
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='email'
                                    label='Email Address'
                                    variant='outlined'
                                    type='email'
                                    fullWidth
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id='password'
                                    label='Password'
                                    variant='outlined'
                                    type='password'
                                    fullWidth
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth onClick={initiateLogIn} variant='contained'>
                                    Log In
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default LogIn;
