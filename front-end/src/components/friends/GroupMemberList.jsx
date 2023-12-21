import { Grid, Typography, IconButton } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import useUserData from '../../hooks/useUserData';
import { axiosPrivate } from '../../api/axios';
import { userGroupAPI } from '../../api/api';
import { useState } from 'react';

const GroupMemberRow = ({ memberItem, isAdmin, removeMember, loading }) => {
    const { id, display_name, email } = memberItem;
    return (
        <Grid item xs={12} sx={{ pt: 1 }}>
            <Grid container alignItems='center'>
                <Grid item xs={6} sm={6}>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>{display_name}</div>
                        <div style={{ fontSize: '10px' }}>Email: {email}</div>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {isAdmin && (
                        <IconButton
                            disabled={loading}
                            color='error'
                            size='small'
                            onClick={() => {
                                removeMember(id);
                            }}
                        >
                            <PersonRemoveIcon />
                        </IconButton>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

const GroupMemberList = (props) => {
    const { groupDetails, groupDetailsQuery } = props;
    const membersList = groupDetails?.members || [];
    const createdBy = groupDetails?.created_by;

    const { userData } = useUserData();
    const currentUser = userData?.user_info;

    const isAdmin = createdBy?.id === currentUser?.id;

    const [loading, setLoading] = useState(false);

    const removeMember = async (memberID) => {
        setLoading(true);
        try {
            const requestData = {
                id: groupDetails.id,
                member_to_remove: memberID,
            };
            await axiosPrivate.patch(userGroupAPI, requestData);
            groupDetailsQuery.refetch();
            alert('Member removed!');
        } catch (err) {
            alert('Error occurred, contact our support team!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Grid item xs={12} sx={{ mt: 1, pl: 1, pr: 1 }}>
                {membersList.map((member) => (
                    <GroupMemberRow
                        key={member.id}
                        memberItem={member}
                        isAdmin={isAdmin}
                        removeMember={removeMember}
                        loading={loading}
                    />
                ))}
            </Grid>
        </>
    );
};

export default GroupMemberList;
