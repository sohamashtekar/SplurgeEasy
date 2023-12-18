import { Grid, Typography, Button } from '@mui/material';
import { useState } from 'react';
import AddFriendDialog from './AddFriendDialog';
import CreateGroupDialog from './CreateGroupDialog';
import FriendRequests from './FriendRequests';
import FriendsList from './FriendsList';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsList from './GroupsList';

const GroupsAndFriendsSection = () => {
    const [addFriend, setAddFriend] = useState(false);
    const [createGroup, setCreateGroup] = useState(false);

    return (
        <>
            {addFriend && <AddFriendDialog open={addFriend} setOpen={setAddFriend} />}
            {createGroup && <CreateGroupDialog open={createGroup} setOpen={setCreateGroup} />}
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
                    <Grid item xs={12} sx={{ pl: '8px', pr: '8px' }}>
                        <FriendRequests />
                    </Grid>
                    <Grid item xs={12} sx={{ pl: '8px', pr: '8px' }}>
                        <FriendsList />
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
                                onClick={() => {
                                    setCreateGroup(true);
                                }}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ pl: '8px', pr: '8px' }}>
                        <GroupsList />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default GroupsAndFriendsSection;
