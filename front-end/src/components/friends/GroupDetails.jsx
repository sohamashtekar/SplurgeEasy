import { Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchGroupDetails from '../../react-query/fetch-group-details';
import GroupMemberList from './GroupMemberList';
import LoadingBackdrop from '../generic/LoadingBackdrop';
import GroupExpenses from './GroupExpenses';

const GroupDetails = () => {
    const { groupID } = useParams();

    const groupDetailsQuery = useQuery({
        queryKey: ['groupDetails', { group_id: groupID }],
        queryFn: fetchGroupDetails,
    });

    const groupDetails = groupDetailsQuery.data ? groupDetailsQuery.data : [];
    const loading = groupDetailsQuery.isFetching;

    return (
        <>
            <LoadingBackdrop open={loading} />

            <Grid container style={{ minHeight: '100%' }}>
                <Grid item xs={12} md={6} sx={{ p: 1, border: '1px dotted lightgrey' }}>
                    <Grid
                        container
                        justifyContent={'center'}
                        style={{ backgroundColor: '#E0E0E0' }}
                    >
                        <Grid item style={{ paddingLeft: 5, textAlign: 'center' }}>
                            <Typography variant='h5' style={{ fontWeight: 500 }}>
                                Shared Expenses
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <GroupExpenses groupDetails={groupDetails} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} sx={{ p: 1, border: '1px dotted lightgrey' }}>
                    <Grid
                        container
                        justifyContent={'center'}
                        style={{ backgroundColor: '#E0E0E0' }}
                    >
                        <Grid item style={{ paddingLeft: 5, textAlign: 'center' }}>
                            <Typography variant='h5' style={{ fontWeight: 500 }}>
                                Group Members
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <GroupMemberList groupDetails={groupDetails} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default GroupDetails;
