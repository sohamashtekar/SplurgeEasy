import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { axiosPrivate } from '../../api/axios';
import { friendRequestAPI } from '../../api/api';
import CustomAlert from '../generic/CustomAlert';

const AddFriendDialog = (props) => {
    const { open, setOpen } = props;

    const [alertMessage, setAlertMessage] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success');

    const [userEmail, setUserEmail] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const addFriend = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post(friendRequestAPI, {
                to_email: userEmail,
            });

            const isSEUser = response.data?.isSeUser;
            const created = response.data?.requestCreated;
            const areUserFriends = response.data?.areUserFriends;
            const isPreviousRequestPending = response.data?.isPreviousRequestPending;

            setUserEmail('');

            if (isSEUser && created) {
                setAlertMessage('Friend request sent!');
                setAlertSeverity('success');
                setAlertOpen(true);
                return;
            }

            if (!isSEUser && created) {
                setAlertMessage(
                    'Your friend is not on WeSplit, we have sent them an email invitation!'
                );
                setAlertSeverity('warning');
                setAlertOpen(true);
                return;
            }

            if (!created && areUserFriends) {
                setAlertMessage(`You are already friends with ${userEmail}!`);
                setAlertSeverity('error');
                setAlertOpen(true);
                return;
            }

            if (!created && isPreviousRequestPending) {
                setAlertMessage('Your previous request is pending!');
                setAlertSeverity('error');
                setAlertOpen(true);
                return;
            }
        } catch (err) {
            alert('Error occoured, contact our support team!');
        }
    };

    return (
        <>
            {alertOpen && (
                <CustomAlert
                    key={alertOpen}
                    open={alertOpen}
                    setOpen={setAlertOpen}
                    message={alertMessage}
                    severity={alertSeverity}
                />
            )}

            <Dialog disableScrollLock={true} open={open} onClose={() => {}}>
                <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#1976d2', color: 'white' }}>
                    Invite friends
                </DialogTitle>
                <form onSubmit={addFriend}>
                    <DialogContent dividers>
                        <Grid container spacing={0} style={{ minWidth: '200px' }}>
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                    }}
                                >
                                    <label
                                        htmlFor='user_email'
                                        style={{ marginRight: 10, textWrap: 'nowrap' }}
                                    >
                                        To:
                                    </label>
                                    <TextField
                                        required
                                        id='user_email'
                                        variant='standard'
                                        size='small'
                                        label='Email'
                                        type='email'
                                        value={userEmail}
                                        onChange={(e) => {
                                            setUserEmail(e.target.value);
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type='submit'>Send Invite</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default AddFriendDialog;
