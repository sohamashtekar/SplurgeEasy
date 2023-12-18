import { Grid, Typography, Button } from '@mui/material';
import useUserData from '../../hooks/useUserData';
import { useNavigate } from 'react-router-dom';

const GroupRow = ({ groupItem }) => {
    const navigate = useNavigate();
    const { id, name, created_by } = groupItem;
    return (
        <Grid item xs={12} sx={{ pt: 1 }}>
            <Grid container alignItems='center'>
                <Grid item xs={6} sm={6}>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>{name}</div>
                        <div style={{ fontSize: '10px' }}>
                            Created by: {created_by.display_name}
                        </div>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        elevation={0}
                        onClick={() => {
                            navigate(`/group-details/${id}`);
                        }}
                    >
                        View
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

const GroupsList = () => {
    const { userData } = useUserData();
    const groupsList = userData?.groups || [];
    return (
        <>
            <Grid item xs={12} sx={{ mt: 1 }}>
                {groupsList.map((groupItem) => (
                    <GroupRow key={groupItem.id} groupItem={groupItem} />
                ))}
            </Grid>
        </>
    );
};

export default GroupsList;
