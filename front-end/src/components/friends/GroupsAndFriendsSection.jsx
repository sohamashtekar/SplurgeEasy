import { Grid, Button } from '@mui/material';
import { useState } from 'react';
import AddFriendDialog from './AddFriendDialog';
import CreateGroupDialog from './CreateGroupDialog';
import FriendRequests from './FriendRequests';
import FriendsList from './FriendsList';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupsList from './GroupsList';
import textClasses from '../generic/styles/TextStyling.module.css';

const GroupsAndFriendsSection = () => {
    const [addFriend, setAddFriend] = useState(false);
    const [createGroup, setCreateGroup] = useState(false);

    return (
        <>
            {addFriend && <AddFriendDialog open={addFriend} setOpen={setAddFriend} />}
            {createGroup && <CreateGroupDialog open={createGroup} setOpen={setCreateGroup} />}
            <Grid container spacing={2} style={{ padding: 3, height: '100%' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent='center' alignItems={'center'} style={{ backgroundColor: '#E0E0E0' }}>
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                            <GroupsIcon />
                        </Grid>
                        <Grid item style={{ paddingLeft: 5, textAlign: 'center' }}>
                            <span className={textClasses.sectionHeader}>Friends</span>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                right: { xs: '3dvw', md: '2dvw', lg: '1dvw' },
                                position: 'absolute',
                            }}
                        >
                            <Button
                                className={textClasses.btnText}
                                sx={{ color: 'black', p: 0 }}
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
                    <Grid
                        container
                        justifyContent='center'
                        alignItems={'center'}
                        style={{ backgroundColor: '#E0E0E0' }}
                    >
                        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                            <GroupsIcon />
                        </Grid>
                        <Grid item style={{ paddingLeft: 5, textAlign: 'center' }}>
                            <span className={textClasses.sectionHeader}>Groups</span>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                right: { xs: '3dvw', md: '2dvw', lg: '1dvw' },
                                position: 'absolute',
                            }}
                        >
                            <Button
                                className={textClasses.btnText}
                                sx={{ color: 'black', p: 0 }}
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
