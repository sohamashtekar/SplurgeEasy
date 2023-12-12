import { axiosPrivate } from '../../api/axios';
import { friendRequestAPI } from '../../api/api';
import { Grid, Typography, Button, Divider } from '@mui/material';
import { useState } from 'react';
import LoadingBackdrop from '../generic/LoadingBackdrop';
import useUserData from '../../hooks/useUserData';

const RequestRow = ({ friendRequest, respondToRequest }) => {
    const { requestID, firstName, lastName, email } = friendRequest;

    return (
        <Grid item xs={12}>
            <Grid container alignItems='center'>
                <Grid item xs={6} sm={6}>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>
                            {firstName} {lastName}
                        </div>
                        <div style={{ fontSize: '10px' }}>{email}</div>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        elevation={0}
                        sx={{ mr: 2 }}
                        onClick={() => {
                            respondToRequest(requestID, true);
                        }}
                    >
                        Accept
                    </Button>
                    <Button
                        size='small'
                        sx={{ color: 'black', borderColor: 'grey' }}
                        onClick={() => {
                            respondToRequest(requestID, false);
                        }}
                    >
                        Ignore
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

const FriendRequests = () => {
    const [loading, setLoading] = useState(false);
    const [showFR, setShowFR] = useState(false);

    const { userData, userDataQuery } = useUserData();
    const friendRequests = userData?.friend_requests || [];

    const respondToRequest = async (requestId, isAccepted) => {
        try {
            setLoading(true);
            await axiosPrivate.patch(friendRequestAPI, {
                requestId: requestId,
                isAccepted: isAccepted,
            });
            userDataQuery.refetch();
        } catch (err) {
            alert('Error occoured, contact our support team!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading ? (
                <LoadingBackdrop />
            ) : (
                <>
                    {friendRequests.length > 0 && (
                        <div style={{ paddingTop: '8px' }}>
                            <Grid
                                item
                                xs={12}
                                sx={{ textAlign: 'center', backgroundColor: '#ffcc80' }}
                            >
                                <Grid container>
                                    <Grid item xs={8} sx={{ textAlign: 'end' }}>
                                        You have new friend requests!
                                    </Grid>
                                    <Grid
                                        item
                                        xs={4}
                                        sx={{ display: 'flex', justifyContent: 'end' }}
                                    >
                                        <Button
                                            size='small'
                                            sx={{
                                                m: '3px',
                                                mr: '8px',
                                                p: 0,
                                                color: 'black',
                                                backgroundColor: '#ffa31a',
                                                fontSize: '12px',
                                            }}
                                            onClick={() => {
                                                setShowFR(!showFR);
                                            }}
                                        >
                                            Show
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Divider />
                            </Grid>
                            {showFR && (
                                <Grid item xs={12} sx={{ mt: 1 }}>
                                    {friendRequests.map((request) => (
                                        <RequestRow
                                            key={request.requestID}
                                            friendRequest={request}
                                            respondToRequest={respondToRequest}
                                        />
                                    ))}
                                </Grid>
                            )}
                            <Divider sx={{ mt: '8px' }} />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default FriendRequests;
