import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './landing-page/LandingPage';
import LogIn from './authentication/LogIn';
import SignUp from './authentication/SignUp';
import Navbar from './layout/Navbar';
import Dashboard from './dashboard/Dashboard';
import { Grid } from '@mui/material';

function ElementWrapper({ children }) {
    return (
        <>
            <Navbar />
            <Grid
                container
                style={{
                    padding: '20',
                    height: '91dvh',
                }}
            >
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </>
    );
}

function RouteWrapper() {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <ElementWrapper>
                        <LandingPage />
                    </ElementWrapper>
                }
            />

            <Route
                path='/login'
                element={
                    <ElementWrapper>
                        <LogIn />
                    </ElementWrapper>
                }
            />

            <Route
                path='/signup'
                element={
                    <ElementWrapper>
                        <SignUp />
                    </ElementWrapper>
                }
            />

            <Route
                path='/dashboard'
                element={
                    <ElementWrapper>
                        <Dashboard />
                    </ElementWrapper>
                }
            />
        </Routes>
    );
}

export default RouteWrapper;
