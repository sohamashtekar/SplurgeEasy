import { Grid, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DescriptionIcon from '@mui/icons-material/Description';
import textClasses from '../generic/styles/TextStyling.module.css';
import useUserData from '../../hooks/useUserData';

const GroupRow = ({ groupItem }) => {
    const navigate = useNavigate();
    const { id, name, created_by } = groupItem;
    return (
        <Grid item xs={12} sx={{ pt: 1 }}>
            <Grid container alignItems='center'>
                <Grid item xs={6} sm={6}>
                    <Typography variant='p' sx={{ mb: 0 }}>
                        <div className={textClasses.nameHeader}>{name}</div>
                        <div className={textClasses.emailSubText}>
                            Created by: {created_by.display_name}
                        </div>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        sx={{ color: 'black' }}
                        startIcon={<DescriptionIcon />}
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
