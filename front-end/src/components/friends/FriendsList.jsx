import { Grid, Typography, Button } from '@mui/material';
import useUserData from '../../hooks/useUserData';

const FriendRow = ({ friendItem }) => {
    const { display_name, email } = friendItem;
    return (
        <Grid item xs={12} sx={{ pt: 1 }}>
            <Grid container alignItems='center'>
                <Grid item xs={6} sm={6}>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div>{display_name}</div>
                        <div style={{ fontSize: '10px' }}>{email}</div>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        disabled={true}
                        variant='contained'
                        color='primary'
                        size='small'
                        elevation={0}
                        onClick={() => {}}
                    >
                        Activity
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

const FriendsList = () => {
    const { userData } = useUserData();
    const friendsList = userData?.friends || [];
    return (
        <>
            <Grid item xs={12} sx={{ mt: 1 }}>
                {friendsList.map((friendItem) => (
                    <FriendRow key={friendItem.id} friendItem={friendItem} />
                ))}
            </Grid>
        </>
    );
};

export default FriendsList;
