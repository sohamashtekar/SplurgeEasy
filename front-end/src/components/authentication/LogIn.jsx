import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { tokenAPI } from '../../api/api';

function LogIn() {
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const initiateLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(tokenAPI, { email: email, password: password });

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth({ email, password, roles, accessToken });
            setEmail('');
            setPassword('');
            setErrMsg('');
            navigate('/dashboard');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Incorrect email or password!');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            <Grid
                container
                style={{
                    backgroundColor: 'darkgray',
                    minHeight: '100%',
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
                        <form onSubmit={initiateLogIn}>
                            <Grid container style={{ padding: '7%' }} spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant='h5' style={{ fontWeight: 600 }}>
                                        Log In
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='email'
                                        ref={emailRef}
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
                                    <Button fullWidth type='submit' variant='contained'>
                                        Log In
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant='p'
                                        ref={errRef}
                                        style={{ fontWeight: 600, color: 'red' }}
                                    >
                                        {errMsg}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default LogIn;
