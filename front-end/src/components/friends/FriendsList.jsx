import { Grid, Typography } from '@mui/material';
import useUserData from '../../hooks/useUserData';
import textClasses from '../generic/styles/TextStyling.module.css';

const FriendRow = ({ friendItem }) => {
    const { display_name, email } = friendItem;
    return (
        <Grid item xs={12} sx={{ pt: 1 }}>
            <Grid container alignItems='center'>
                <Grid item xs={12}>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div className={textClasses.nameHeader}>{display_name}</div>
                        <div className={textClasses.emailSubText}>{email}</div>
                    </Typography>
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
