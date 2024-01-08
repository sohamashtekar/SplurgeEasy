import { Grid, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import AddGroupMembersDialog from './AddGroupMembersDialog';
import fetchGroupDetails from '../../react-query/fetch-group-details';
import GroupExpenses from './GroupExpenses';
import GroupMemberList from './GroupMemberList';
import LoadingBackdrop from '../generic/LoadingBackdrop';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const GroupDetails = () => {
    const { groupID } = useParams();
    const [openAddMembers, setOpenAddMembers] = useState(false);

    const groupDetailsQuery = useQuery({
        queryKey: ['groupDetails', { group_id: groupID }],
        queryFn: fetchGroupDetails,
    });

    const groupDetails = groupDetailsQuery.data ? groupDetailsQuery.data : [];
    const loading = groupDetailsQuery.isFetching;

    return (
        <>
            <LoadingBackdrop open={loading} />

            <AddGroupMembersDialog
                open={openAddMembers}
                setOpen={setOpenAddMembers}
                groupDetails={groupDetails}
                groupDetailsQuery={groupDetailsQuery}
            />

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
                                Members
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                right: { xs: '4dvw', md: '2dvw', lg: '1dvw' },
                                position: 'absolute',
                            }}
                        >
                            <Button
                                sx={{ color: 'black', p: 0 }}
                                startIcon={<PersonAddIcon />}
                                onClick={() => {
                                    setOpenAddMembers((prev) => !prev);
                                }}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <GroupMemberList
                                groupDetails={groupDetails}
                                groupDetailsQuery={groupDetailsQuery}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default GroupDetails;
