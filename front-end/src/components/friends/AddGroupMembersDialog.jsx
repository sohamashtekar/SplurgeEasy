import { axiosPrivate } from '../../api/axios';
import { CustomDialogHeader } from '../generic/styles/CustomDIalogHeader';
// prettier-ignore
import { Dialog, DialogContent, DialogActions, Button, Grid, TextField, Autocomplete, Divider, Paper, IconButton, } from '@mui/material';
import { userGroupAPI } from '../../api/api';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CustomDialogPaperBlank from '../generic/CustomDialogPaperBlank';
import useUserData from '../../hooks/useUserData';

const AddGroupMembersDialog = (props) => {
    const { userData, userDataQuery } = useUserData();
    const { groupDetails, groupDetailsQuery, open, setOpen } = props;

    const [loading, setLoading] = useState(false);
    const [newGroupMembers, setNewGroupMembers] = useState([]);

    if (!open) {
        return <></>;
    }

    const groupMembers = groupDetails?.members.map((member) => member.id) || [];
    const friendsNotInThisGroup = userData?.friends?.filter(
        (friend) => !groupMembers.includes(friend.id)
    );

    const handleClose = () => {
        setOpen(false);
    };

    const handleGroupMembersChange = (updatedMembers) => {
        setNewGroupMembers(updatedMembers);
    };

    const updateGroup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedMembersId = newGroupMembers?.map((item) => item.id);
            const requestData = {
                id: groupDetails.id,
                updated_members: updatedMembersId,
            };
            await axiosPrivate.patch(userGroupAPI, requestData);
            userDataQuery.refetch();
            groupDetailsQuery.refetch();
            setOpen(false);
            alert('Members added!');
        } catch (err) {
            alert('Error occurred, contact our support team!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={(e) => {
                    e.preventDefault();
                }}
                PaperComponent={CustomDialogPaperBlank}
                disableScrollLock={true}
            >
                <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                    <Paper elevation={2} sx={{ minWidth: '-webkit-fill-available' }}>
                        <CustomDialogHeader item>
                            Add Members
                            <IconButton size='small' onClick={() => setOpen(false)}>
                                <CloseIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </CustomDialogHeader>
                        <form onSubmit={updateGroup}>
                            <DialogContent dividers>
                                <Grid container spacing={2} style={{ minWidth: '200px' }}>
                                    <Grid item xs={12}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'start',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Autocomplete
                                                disabled={loading}
                                                multiple
                                                fullWidth
                                                required
                                                id='users'
                                                size='small'
                                                sx={{ width: '100%' }}
                                                value={newGroupMembers}
                                                options={friendsNotInThisGroup}
                                                getOptionLabel={(option) => option.display_name}
                                                onChange={(event, newValue, reason) => {
                                                    handleGroupMembersChange(newValue, reason);
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant='standard'
                                                        placeholder='Select to add'
                                                        required={!newGroupMembers.length > 0}
                                                    />
                                                )}
                                            />
                                        </div>
                                        <Divider style={{ marginTop: 9 }} />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit' disabled={loading}>
                                    Add
                                </Button>
                            </DialogActions>
                        </form>
                    </Paper>
                </Grid>
            </Dialog>
        </>
    );
};

export default AddGroupMembersDialog;
