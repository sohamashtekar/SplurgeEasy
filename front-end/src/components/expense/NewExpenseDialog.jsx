import { axiosPrivate } from '../../api/axios';
// prettier-ignore
import { Button, Dialog, DialogContent, IconButton, Typography, Grid, Autocomplete, TextField, Divider, Paper, Menu, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { CustomDialogHeader } from '../generic/styles/CustomDIalogHeader';
import { saveExpenseAPI } from '../../api/api';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CustomDialogPaperBlank from '../generic/CustomDialogPaperBlank';
import SplitDetailsDialog from './SplitDetailsDialog';
import useUserData from '../../hooks/useUserData';
import { GroupAutoComplete, IndividualAutoComplete } from './ExpenseAutoComplete';

function getTodaysDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function ExpenseOwnerMenu(props) {
    const { anchorEl, setAnchorEl, options, setPaidBy, userInfo } = props;

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOwnerChange = (newOwner) => {
        setPaidBy(newOwner);
        handleClose();
    };

    return (
        <Menu
            id='paid-by-menu'
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            {options.map((friend) => (
                <MenuItem
                    key={friend.display_name}
                    onClick={() => {
                        handleOwnerChange(friend);
                    }}
                >
                    {friend.display_name}
                </MenuItem>
            ))}
        </Menu>
    );
}

function NewExpenseDialog(props) {
    const { open, setOpen } = props;
    const { userData, userDataQuery } = useUserData();

    const userInfo = userData?.user_info;
    const friends = userData?.friends;
    const groups = userData?.groups;

    const [anchorEl, setAnchorEl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openSplitDetail, setOpenSplitDetail] = useState(false);

    const [expenseType, setExpenseType] = useState('Individual');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [splitBetweenUsers, setSplitBetweenUsers] = useState([]);
    const [desc, setDesc] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [expenseDate, setExpenseDate] = useState(getTodaysDate());
    const [note, setNote] = useState('');
    const [paidBy, setPaidBy] = useState(userInfo);
    const [splitDetail, setSplitDetail] = useState({
        splitMethod: 'E',
        splitUsers: [],
        splitValues: [],
    });

    useEffect(() => {
        setSelectedUsers([]);
        setSelectedGroup(null);
        setSplitBetweenUsers([]);
    }, [expenseType]);

    if (!open) {
        return <></>;
    }

    const handleExpenseTypeChange = (event, newType) => {
        setExpenseType(newType);
    };

    const getMyAmount = () => {
        const isPaidByMe = paidBy.id === userInfo.id;
        const myShare = splitDetail.splitValues.find((item) => item.user.id === userInfo.id);

        const myCalculatedShare = myShare?.calculatedAmount || 0;
        const mySettlement = parseFloat(
            isPaidByMe ? totalAmount - myCalculatedShare : Math.abs(myCalculatedShare)
        ).toFixed(2);

        return myCalculatedShare
            ? isPaidByMe
                ? `You get ${mySettlement}$`
                : `You pay ${mySettlement}$`
            : '';
    };

    const handleClose = () => {
        setOpen(false);
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
        setOpenSplitDetail(true);
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
                    user: item.user.id,
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

            await axiosPrivate.post(saveExpenseAPI, requestData);
            userDataQuery.refetch();
            setOpen(false);
            alert('Expense saved!');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={(e) => {
                    e.preventDefault();
                }}
                PaperComponent={CustomDialogPaperBlank}
                disableScrollLock={true}
            >
                <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                    <Paper elevation={2} style={{ maxWidth: '99dvw' }}>
                        <CustomDialogHeader item>
                            Share Expense
                            <IconButton size='small' onClick={() => setOpen(false)}>
                                <CloseIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </CustomDialogHeader>
                        <DialogContent dividers sx={{ p: 1 }}>
                            <ExpenseOwnerMenu
                                userInfo={userInfo}
                                options={splitBetweenUsers}
                                anchorEl={anchorEl}
                                setAnchorEl={setAnchorEl}
                                setPaidBy={setPaidBy}
                            />
                            <form onSubmit={saveExpense}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <ToggleButtonGroup
                                            value={expenseType}
                                            exclusive
                                            fullWidth
                                            onChange={handleExpenseTypeChange}
                                            aria-label='ExpenseType'
                                            color='primary'
                                        >
                                            <ToggleButton value='Individual'>
                                                Individual
                                            </ToggleButton>
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
                                            onChange={(e) =>
                                                setTotalAmount(parseFloat(e.target.value))
                                            }
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
                                                    ? 'Equally'
                                                    : 'Unequally'}
                                            </Button>
                                            .
                                        </Typography>
                                        <Typography component={'div'} variant='p'>
                                            {getMyAmount()}
                                        </Typography>
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
                                                onClick={handleClose}
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
                            </form>
                        </DialogContent>
                    </Paper>
                </Grid>

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
            </Dialog>
        </>
    );
}

export default NewExpenseDialog;
