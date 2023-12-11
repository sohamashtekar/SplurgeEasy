import { axiosPrivate } from '../../api/axios';
import { friendRequestAPI } from '../../api/api';
import { Grid, Typography, Button, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import LoadingBackdrop from '../generic/LoadingBackdrop';

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
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const getFriendRequests = async () => {
        setLoading(true);
        try {
            const response = await axiosPrivate.get(friendRequestAPI);
            setFriendRequests(response.data?.friend_requests);
        } catch (err) {
            alert('Error occoured, contact our support team!');
        } finally {
            setLoading(false);
        }
    };

    const respondToRequest = async (requestId, isAccepted) => {
        try {
            const response = await axiosPrivate.patch(friendRequestAPI, {
                requestId: requestId,
                isAccepted: isAccepted,
            });
            console.log(response);
        } catch (err) {
            alert('Error occoured, contact our support team!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getFriendRequests();
    }, []);

    return (
        <>
            {loading ? (
                <LoadingBackdrop />
            ) : (
                <>
                    {friendRequests.length > 0 && (
                        <div>
                            <Grid
                                item
                                xs={12}
                                sx={{ textAlign: 'center', backgroundColor: '#ffcc80' }}
                            >
                                You have new friend requests!
                                <Divider />
                            </Grid>
                            <Grid item xs={12} sx={{ mt: 1 }}>
                                {friendRequests.map((request) => (
                                    <RequestRow
                                        key={request.requestID}
                                        friendRequest={request}
                                        respondToRequest={respondToRequest}
                                    />
                                ))}
                            </Grid>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default FriendRequests;
