import { Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';
import AddFriendDialog from './AddFriendDialog';
import FriendRequests from './FriendRequests';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const GroupsAndFriendsSection = () => {
    const [addFriend, setAddFriend] = useState(false);
    return (
        <>
            <AddFriendDialog open={addFriend} setOpen={setAddFriend} />
            <Grid container style={{ padding: 3, height: '100%' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent='center' style={{ backgroundColor: '#e0e0e0' }}>
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                            <GroupsIcon />
                        </Grid>
                        <Grid item style={{ paddingLeft: 5, textAlign: 'center' }}>
                            <Typography variant='h5' style={{ fontWeight: 500 }}>
                                Friends
                            </Typography>
                        </Grid>
                        <Grid item style={{ right: '3dvw', position: 'absolute' }}>
                            <Button
                                sx={{ color: 'black' }}
                                size='small'
                                startIcon={<PersonAddIcon />}
                                onClick={() => {
                                    setAddFriend(true);
                                }}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ padding: '8px' }}>
                        <FriendRequests />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent='center' style={{ backgroundColor: '#e0e0e0' }}>
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                            <GroupsIcon />
                        </Grid>
                        <Grid item style={{ paddingLeft: 5, textAlign: 'center' }}>
                            <Typography variant='h5' style={{ fontWeight: 500 }}>
                                Groups
                            </Typography>
                        </Grid>
                        <Grid item style={{ right: '3dvw', position: 'absolute' }}>
                            <Button
                                sx={{ color: 'black' }}
                                size='small'
                                startIcon={<PersonAddIcon />}
                                onClick={() => {}}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default GroupsAndFriendsSection;
