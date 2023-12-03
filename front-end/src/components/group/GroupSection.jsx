import GroupsIcon from '@mui/icons-material/Groups';
import { Grid, Typography } from '@mui/material';

const GroupSection = () => {
    return (
        <Grid container style={{ padding: 3, height: '100%' }}>
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
                </Grid>
            </Grid>
        </Grid>
    );
};

export default GroupSection;
