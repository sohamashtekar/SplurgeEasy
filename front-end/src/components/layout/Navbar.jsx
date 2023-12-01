import React, { useState, useContext } from 'react';
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
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Navbar() {
    const navigate = useNavigate();

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

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        component='div'
                        sx={{ flexGrow: 1, textAlign: 'start' }}
                        style={{ fontWeight: 600 }}
                    >
                        SplurgeEasy
                    </Typography>
                    {auth && (
                        <div>
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
                                    vertical: 'top',
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
                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                    {!auth && (
                        <div style={{ width: '50%', overflow: 'hidden' }}>
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
