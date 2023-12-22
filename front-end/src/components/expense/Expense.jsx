import { axiosPrivate } from '../../api/axios';
// prettier-ignore
import { Button, Typography, Grid, TextField, Divider, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { getTodaysDate } from './functions/GetDate';
import { GroupAutoComplete, IndividualAutoComplete } from './ExpenseAutoComplete';
import { saveExpenseAPI } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ExpenseOwnerMenu from './ExpenseOwnerMenu';
import SplitDetailsDialog from './SplitDetailsDialog';
import textClasses from '../generic/styles/TextStyling.module.css';
import useUserData from '../../hooks/useUserData';

function Expense(props) {
    const navigate = useNavigate();
    const { expenseDetails } = props;
    const { userData, userDataQuery } = useUserData();

    const userInfo = userData?.user_info;
    const friends = userData?.friends;
    const groups = userData?.groups;

    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openSplitDetail, setOpenSplitDetail] = useState(false);

    const [expenseType, setExpenseType] = useState(expenseDetails?.group ? 'Group' : 'Individual');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(expenseDetails?.group || null);
    const [splitBetweenUsers, setSplitBetweenUsers] = useState(
        expenseDetails?.split_details?.map((detail) => detail.user) || []
    );
    const [desc, setDesc] = useState(expenseDetails?.description || '');
    const [totalAmount, setTotalAmount] = useState(expenseDetails?.total_amount || 0);
    const [expenseDate, setExpenseDate] = useState(getTodaysDate());
    const [note, setNote] = useState(expenseDetails?.note || '');
    const [paidBy, setPaidBy] = useState(expenseDetails?.paid_by || userInfo);
    const [splitDetail, setSplitDetail] = useState({
        splitMethod: expenseDetails?.split_method || 'E',
        splitUsers: expenseDetails?.split_details?.map((detail) => detail.user) || [],
        splitValues: expenseDetails?.split_details || [],
    });

    useEffect(() => {
        if (!expenseDetails) {
            setSelectedUsers([]);
            setSelectedGroup(null);
            setSplitBetweenUsers([]);
        }
    }, [expenseType]);

    const handleExpenseTypeChange = (event, newType) => {
        setExpenseType(newType);
    };

    const getMyAmount = () => {
        const isPaidByMe = paidBy.id === userInfo.id;
        const myShare = splitDetail.splitValues.find((item) => item.user.id === userInfo.id);

        const myCalculatedShare = myShare?.calculatedAmount || myShare?.calculated_amount || 0;
        const mySettlement = parseFloat(
            isPaidByMe ? totalAmount - myCalculatedShare : Math.abs(myCalculatedShare)
        ).toFixed(2);

        return myCalculatedShare
            ? isPaidByMe
                ? `You get ${mySettlement}$`
                : `You pay ${mySettlement}$`
            : '$(0.00/person)';
    };

    const handleSelectedUsersChange = (newUsers) => {
        setSelectedUsers(newUsers);
        setSplitBetweenUsers([...newUsers, userInfo]);
    };

    const handleSelectedGroupChange = (newGroup) => {
        setSelectedGroup(newGroup);
        const groupMembers = newGroup?.members || [];
        setSplitBetweenUsers(groupMembers);
    };

    const handleSplit = () => {
        setOpenSplitDetail((prev) => !prev);
    };

    const validateExpenseData = () => {
        // Validation functions
        const getErrors = () => {
            let calculatedTotal = 0;
            let userDoesNotOwe = false;

            splitDetail.splitValues.forEach((item) => {
                calculatedTotal += Math.abs(item.calculatedAmount);

                userDoesNotOwe =
                    Math.abs(item.calculatedAmount) === 0 ? item.user.display_name : userDoesNotOwe;
            });

            return {
                totalAmtErr: !(calculatedTotal === totalAmount),
                userDoesNotIncludedErr: userDoesNotOwe,
            };
        };
        return getErrors();
    };

    const saveExpense = async (e) => {
        e.preventDefault();

        const { totalAmtErr, userDoesNotIncludedErr } = validateExpenseData();

        if (totalAmtErr) {
            alert('Shared expenses do not sum up to Total Amount provided, Please fix this error!');
            return;
        }

        if (userDoesNotIncludedErr) {
            if (
                !window.confirm(
                    `${userDoesNotIncludedErr} is added to the expense but, expenses are not shared with this user, do you want to continue?\nUser will be removed from this expense automatically!`
                )
            ) {
                return;
            }
        }

        setLoading(true);
        try {
            const splitDetailObj = splitDetail.splitValues.map((item) => {
                return {
                    user: item.user,
                    split_method: splitDetail.splitMethod,
                    value: parseFloat(item.value).toFixed(2),
                    calculated_amount: parseFloat(item.calculatedAmount).toFixed(2),
                };
            });

            const requestData = {
                total_amount: totalAmount,
                description: desc,
                split_method: splitDetail.splitMethod,
                split_detail: splitDetailObj,
                note: note,
                group: selectedGroup?.id || null,
                created_by: userInfo.id,
                paid_by: paidBy.id,
            };

            if (expenseDetails) {
                requestData['id'] = expenseDetails.id;
            }

            await axiosPrivate.post(saveExpenseAPI, requestData);
            userDataQuery.refetch();
            alert('Expense saved!');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ExpenseOwnerMenu
                userInfo={userInfo}
                options={splitBetweenUsers}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                setPaidBy={setPaidBy}
            />
            <form onSubmit={saveExpense} style={{ height: '100%' }}>
                <Grid
                    container
                    style={{ height: '100%' }}
                    justifyContent={'center'}
                    alignItems={{ sm: 'flex-start', md: 'center' }}
                    spacing={0}
                >
                    <Grid item xs={12} md={6} style={{ padding: '10px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <span className={textClasses.sectionHeader}>
                                    {expenseDetails ? 'Edit Shared Expense' : 'Share New Expense'}
                                </span>
                            </Grid>
                            <Grid item xs={12}>
                                <ToggleButtonGroup
                                    value={expenseType}
                                    exclusive
                                    fullWidth
                                    onChange={handleExpenseTypeChange}
                                    aria-label='ExpenseType'
                                    color='primary'
                                >
                                    <ToggleButton value='Individual'>Individual</ToggleButton>
                                    <ToggleButton value='Group'>Group</ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                    }}
                                >
                                    <label
                                        htmlFor='users'
                                        style={{ marginRight: 5, textWrap: 'nowrap' }}
                                    >
                                        With <strong>You</strong> and:
                                    </label>
                                    {expenseType === 'Individual' ? (
                                        <IndividualAutoComplete
                                            disabled={loading}
                                            selectedOptions={selectedUsers}
                                            Options={friends}
                                            handleChange={handleSelectedUsersChange}
                                        />
                                    ) : (
                                        <GroupAutoComplete
                                            disabled={loading}
                                            selectedOption={selectedGroup}
                                            Options={groups}
                                            handleChange={handleSelectedGroupChange}
                                        />
                                    )}
                                </div>
                                <Divider style={{ marginTop: 9 }} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    disabled={loading}
                                    required
                                    name='desc'
                                    variant='standard'
                                    label='Description'
                                    size='small'
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    disabled={loading}
                                    required
                                    name='amount'
                                    variant='standard'
                                    label='Total Amount'
                                    size='small'
                                    inputProps={{
                                        type: 'number',
                                        step: '0.01',
                                        min: '1',
                                    }}
                                    value={totalAmount}
                                    onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Typography component={'div'} variant='p'>
                                    <span>Paid by </span>
                                    <Button
                                        disabled={loading}
                                        style={{ padding: 0, minWidth: 0 }}
                                        aria-controls='paid-by-menu'
                                        aria-haspopup='true'
                                        onClick={(e) => setAnchorEl(e.currentTarget)}
                                    >
                                        {paidBy === userInfo ? 'You' : paidBy?.display_name}
                                    </Button>
                                    <span> and split </span>
                                    <Button
                                        disabled={loading}
                                        style={{ padding: 0 }}
                                        onClick={() => handleSplit()}
                                    >
                                        {splitDetail.splitMethod === 'E'
                                            ? 'Equally.'
                                            : 'Unequally.'}
                                    </Button>
                                </Typography>
                                <Typography variant='p'>{getMyAmount()}</Typography>
                                <SplitDetailsDialog
                                    open={openSplitDetail}
                                    setOpen={setOpenSplitDetail}
                                    splitDetail={splitDetail}
                                    setSplitDetail={setSplitDetail}
                                    paidBy={paidBy}
                                    totalAmount={totalAmount}
                                    splitBetweenUsers={splitBetweenUsers}
                                    expenseType={expenseType}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    disabled={loading}
                                    required
                                    fullWidth
                                    name='expenseDateTime'
                                    variant='standard'
                                    label='Date'
                                    size='small'
                                    type='date'
                                    value={expenseDate}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={(e) => setExpenseDate(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    disabled={loading}
                                    fullWidth
                                    name='note'
                                    variant='standard'
                                    label='Note'
                                    size='small'
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        pt: 1,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Button
                                        disabled={loading}
                                        size='small'
                                        color='inherit'
                                        variant='contained'
                                        autoFocus
                                        onClick={() => {
                                            navigate('/dashboard');
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={loading}
                                        size='small'
                                        type='submit'
                                        color='primary'
                                        variant='contained'
                                        autoFocus
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default Expense;
