import {
    Grid,
    Paper,
    Typography,
    TextField,
    Button,
    FormControlLabel,
    Checkbox,
} from '@mui/material';
import { tokenAPI } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import CustomAlert from '../generic/CustomAlert';

function LogIn() {
    const { signUpEmail } = useParams();
    const navigate = useNavigate();

    const { auth, setAuth, persist, setPersist } = useAuth();
    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState(signUpEmail || '');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        auth?.accessToken && navigate('/dashboard');
    }, [auth]);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist]);

    const togglePersist = () => {
        setPersist((prev) => !prev);
    };

    const initiateLogIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                tokenAPI,
                { email: email, password: password },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );

            const accessToken = response?.data?.access;
            const roles = response?.data?.roles;
            const name = response?.data?.name;

            setAuth({ email, roles, accessToken, name });
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
            {signUpEmail && (
                <CustomAlert
                    open={true}
                    message={'Sign up complete, you can now log in!'}
                    severity={'success'}
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
                <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper
                        elevation={3}
                        style={{
                            width: '100%',
                            height: 'fit-content',
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
                                        defaultValue={email}
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
                                    <FormControlLabel
                                        label='Trust this device?'
                                        control={
                                            <Checkbox
                                                checked={persist}
                                                onChange={togglePersist}
                                                color='primary'
                                            />
                                        }
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
