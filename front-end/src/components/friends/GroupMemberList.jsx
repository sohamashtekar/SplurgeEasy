import { Grid, Typography, IconButton } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import useUserData from '../../hooks/useUserData';

const GroupMemberRow = ({ memberItem, isAdmin, removeMember }) => {
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
    const { groupDetails } = props;
    const membersList = groupDetails?.members;
    const createdBy = groupDetails?.created_by;

    const { userData } = useUserData();
    const currentUser = userData?.user_info;

    const isAdmin = createdBy?.id === currentUser?.id;

    const removeMember = (memberID) => {
        console.log(memberID);
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
                    />
                ))}
            </Grid>
        </>
    );
};

export default GroupMemberList;
