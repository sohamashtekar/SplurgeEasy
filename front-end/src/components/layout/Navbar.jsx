import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    IconButton,
    MenuItem,
    Menu,
    Button,
    Grid,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const logout = useLogout();

    const { auth } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogIn = () => {
        navigate('/login');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const goToDashboard = () => {
        navigate('/dashboard');
    };

    const handleLogOut = async () => {
        await logout();
        navigate('/');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    {location.pathname !== '/dashboard' && (
                        <IconButton
                            size='large'
                            onClick={goToDashboard}
                            color='inherit'
                            sx={{ paddingLeft: 0, display: { xs: 'block', md: 'none' } }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1, textAlign: 'start' }}
                        style={{ fontWeight: 600 }}
                        onClick={goToDashboard}
                    >
                        WeSplit
                    </Typography>
                    {auth?.accessToken && (
                        <div>
                            <Typography variant='p'>{auth.name || ''}</Typography>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleMenu}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!auth?.accessToken && (
                        <div>
                            <Grid
                                container
                                spacing={1}
                                justifyContent={'end'}
                                alignItems={'center'}
                            >
                                <Grid item>
                                    <Button
                                        onClick={handleLogIn}
                                        variant='outlined'
                                        style={{ color: '#FFFFFF' }}
                                    >
                                        LogIn
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
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
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;
