import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { signUpAPI } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import React, { useState, useEffect } from 'react';
import CustomAlert from '../generic/CustomAlert';
import LoadingBackdrop from '../generic/LoadingBackdrop';

function SignUp() {
    const navigate = useNavigate();

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [fieldErrs, setFieldErrs] = useState({});

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const initiateSignUp = async (e) => {
        e.preventDefault();

        // validate passwords
        if (password !== confirmPassword) {
            setFieldErrs({
                password: 'Passwords do not match!',
                confirm_password: 'Passwords do not match!',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(signUpAPI, {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            });

            if (response.status === 201) {
                setLoading(false);
                setFirstName('');
                setLastName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setErrMsg('');
                setFieldErrs({});
                setSuccess(true);
            }
        } catch (err) {
            setLoading(false);
            if (!err?.response) {
                setErrMsg('No Server Response, contact our support team!');
            } else if (err.response?.status === 400) {
                setFieldErrs(err?.response?.data);
            } else {
                setErrMsg('No Server Response, contact our support team!');
            }
        }
    };

    return (
        <>
            <LoadingBackdrop open={loading} />
            {success && (
                <CustomAlert
                    open={true}
                    message={'Sign up complete, proceed to login!'}
                    severity={'success'}
                    action={
                        <Button color='inherit' size='small' onClick={(e) => navigate('/login')}>
                            Log In
                        </Button>
                    }
                />
            )}
            <Grid
                container
                style={{
                    minHeight: '100%',
                }}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Grid item xs={12} lg={6} sx={{ p: 1 }}>
                    <Paper elevation={3}>
                        <form onSubmit={initiateSignUp}>
                            <Grid container style={{ padding: '7%' }} spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h5' style={{ fontWeight: 600 }}>
                                        Sign Up
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id='first_name'
                                        label='First Name'
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        error={Boolean(fieldErrs?.first_name)}
                                        helperText={fieldErrs?.first_name}
                                        fullWidth
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        id='last_name'
                                        label='Last Name'
                                        variant='outlined'
                                        type='text'
                                        size='small'
                                        error={Boolean(fieldErrs?.last_name)}
                                        helperText={fieldErrs?.last_name}
                                        fullWidth
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='email'
                                        label='Email Address'
                                        variant='outlined'
                                        type='email'
                                        size='small'
                                        error={Boolean(fieldErrs?.email)}
                                        helperText={fieldErrs?.email}
                                        fullWidth
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='password'
                                        label='Password'
                                        variant='outlined'
                                        type='password'
                                        size='small'
                                        error={Boolean(fieldErrs?.password)}
                                        helperText={fieldErrs?.password}
                                        fullWidth
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id='confirm_password'
                                        label='Confirm Password'
                                        variant='outlined'
                                        type='password'
                                        size='small'
                                        error={Boolean(fieldErrs?.confirm_password)}
                                        helperText={fieldErrs?.confirm_password}
                                        fullWidth
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button fullWidth type='submit' variant='contained'>
                                        Sign Up
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant='p'
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

export default SignUp;
