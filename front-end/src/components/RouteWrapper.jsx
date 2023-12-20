import { Grid } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { UserDataProvider } from '../context/UserDataProvider';
import Dashboard from './dashboard/Dashboard';
import GroupDetails from './friends/GroupDetails';
import LandingPage from './landing-page/LandingPage';
import LogIn from './authentication/LogIn';
import Missing from './authentication/Missing';
import Navbar from './layout/Navbar';
import PersistLogin from './authentication/PersistLogin';
import React from 'react';
import RequireAuth from './authentication/RequireAuth';
import SignUp from './authentication/SignUp';

function ElementWrapper({ children }) {
    return (
        <>
            <Navbar />
            <Grid
                container
                style={{
                    padding: '1dvh',
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

function ProtectedElementWrapper({ children }) {
    return (
        <UserDataProvider>
            <Navbar />
            <Grid
                container
                style={{
                    padding: '1dvh',
                    height: '91dvh',
                }}
            >
                <Grid item xs={12}>
                    {children}
                </Grid>
            </Grid>
        </UserDataProvider>
    );
}

function RouteWrapper() {
    return (
        <Routes>
            <Route element={<PersistLogin />}>
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
            </Route>

            <Route
                path='/signup'
                element={
                    <ElementWrapper>
                        <SignUp />
                    </ElementWrapper>
                }
            />

            {/* Protected routes start here */}
            <Route element={<PersistLogin />}>
                <Route element={<RequireAuth allowedRoles={[]} />}>
                    <Route
                        path='/dashboard'
                        element={
                            <ProtectedElementWrapper>
                                <Dashboard />
                            </ProtectedElementWrapper>
                        }
                    />

                    <Route
                        path='/group-details/:groupID'
                        element={
                            <ProtectedElementWrapper>
                                <GroupDetails />
                            </ProtectedElementWrapper>
                        }
                    />
                </Route>
            </Route>

            <Route
                path='*'
                element={
                    <ElementWrapper>
                        <Missing />
                    </ElementWrapper>
                }
            />
        </Routes>
    );
}

export default RouteWrapper;
