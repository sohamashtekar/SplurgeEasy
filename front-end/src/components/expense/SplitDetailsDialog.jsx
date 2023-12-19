import { CustomDialogHeader } from '../generic/styles/CustomDIalogHeader';
// prettier-ignore
import { equallyCalculatedValue, unequallyCalculatedValues, } from './functions/SplitValueCalculations';
// prettier-ignore
import { IconButton, DialogContent, Typography, Grid, Paper, Tabs, TextField, InputAdornment, Divider, Checkbox } from '@mui/material';
import { StyledTab, StyledTabPanel } from './styles/SplitDetailsTabStyles';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const SplitDetailsDialog = (props) => {
    const {
        open,
        setOpen,
        splitDetail,
        setSplitDetail,
        paidBy,
        totalAmount,
        splitBetweenUsers,
        expenseType,
    } = props;

    const [splitMethod, setSplitType] = useState(splitDetail?.splitMethod || 'E');

    const calculateSplitDetails = (splitMethodUpdated = false) => {
        // Applies only if values are split in shares.
        let totalShares = 0;
        if (splitMethod == 'S') {
            splitBetweenUsers?.forEach((splitUser) => {
                totalShares += parseFloat(
                    document.getElementById(`split-value-${splitUser?.id}`)?.value || 0
                );
            });
        }

        const onlyIncludedUsers = splitBetweenUsers.filter((user) => {
            const included = document.getElementById(`included-${user?.id}`)?.checked;
            return included || included === undefined;
        });

        const splitValues = splitBetweenUsers?.map((splitUser) => {
            const included = onlyIncludedUsers.find((includedUser) => includedUser === splitUser);

            if (!included) {
                return {
                    user: splitUser,
                    value: 0,
                    calculatedAmount: 0,
                };
            }

            const inputValue = splitMethodUpdated
                ? 0
                : document.getElementById(`split-value-${splitUser?.id}`)?.value || 0;

            const value =
                splitMethod === 'E'
                    ? equallyCalculatedValue(totalAmount, onlyIncludedUsers)
                    : inputValue;

            const calculatedAmount =
                splitMethod === 'E'
                    ? equallyCalculatedValue(totalAmount, onlyIncludedUsers)
                    : unequallyCalculatedValues(totalAmount, inputValue, splitMethod, totalShares);

            const paidByThisUser = paidBy?.id === splitUser?.id;
            return {
                user: splitUser,
                value: parseFloat(value),
                calculatedAmount: paidByThisUser ? calculatedAmount : -calculatedAmount,
            };
        });

        const updatedSplitDetails = {
            splitMethod: splitMethod,
            splitUsers: splitBetweenUsers,
            splitValues: splitValues,
        };

        setSplitDetail(updatedSplitDetails);
    };

    useEffect(() => {
        calculateSplitDetails();
    }, [paidBy, totalAmount, splitBetweenUsers]);

    useEffect(() => {
        calculateSplitDetails(true);
    }, [splitMethod]);

    if (!open) {
        return <></>;
    }

    const getUsersAmt = (user) => {
        const userSplitDetails = splitDetail?.splitValues?.find((item) => item.user == user);
        const userAmt = userSplitDetails?.calculatedAmount;
        return userAmt ? Math.abs(userAmt).toFixed(2) : 0;
    };

    const handleIncludeChange = (event) => {
        calculateSplitDetails();
    };

    const handleChange = (event, newValue) => {
        setSplitType(newValue);
    };

    const handleTextValueChange = (event) => {
        calculateSplitDetails();
    };

    const calculateTotalTxtValue = () => {
        let calculatedTotal = 0;
        if (splitMethod !== 'E') {
            splitDetail['splitValues']?.forEach(
                (item) => (calculatedTotal += Math.abs(item.calculatedAmount))
            );
        }
        return `${calculatedTotal.toFixed(2)} of $${totalAmount}`;
    };

    const calculatedTotalText = calculateTotalTxtValue();

    return (
        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            <Paper elevation={2} style={{ maxWidth: '99dvw' }}>
                <CustomDialogHeader item>
                    Split Details
                    <IconButton size='small' onClick={() => setOpen(false)}>
                        <CloseIcon sx={{ color: 'white' }} />
                    </IconButton>
                </CustomDialogHeader>
                <DialogContent dividers sx={{ padding: '5px' }}>
                    <Grid container direction='row' justify='flex-end' alignItems='center'>
                        <Grid item xs={12}>
                            <Tabs
                                value={splitMethod}
                                onChange={handleChange}
                                variant='fullWidth'
                                TabIndicatorProps={{
                                    style: { backgroundColor: 'transparent' },
                                }}
                            >
                                <StyledTab value='E' label='=' tooltipText='Split Equally' />
                                <StyledTab value='P' label='%' tooltipText='Split in Percentage' />
                                <StyledTab
                                    value='U'
                                    label='1.23'
                                    tooltipText='Split in Exact Amounts'
                                />
                                <StyledTab
                                    value='S'
                                    icon={<EqualizerIcon />}
                                    tooltipText='Split in Shares'
                                />
                            </Tabs>
                        </Grid>
                    </Grid>
                    <StyledTabPanel value={splitMethod} index={'E'}>
                        {splitMethod === 'E' && (
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                            Split Equally
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {splitDetail?.splitValues?.map((infoDict) => (
                                            <Grid container key={infoDict.user.email}>
                                                <Grid
                                                    item
                                                    xs={1}
                                                    sx={{ display: 'flex', alignItems: 'start' }}
                                                >
                                                    <Checkbox
                                                        defaultChecked
                                                        sx={{ p: 0 }}
                                                        id={`included-${infoDict.user?.id}`}
                                                        onChange={handleIncludeChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={9}>
                                                    {infoDict.user.display_name}
                                                </Grid>
                                                <Grid item xs={2} sx={{ textAlign: 'end' }}>
                                                    $
                                                    {Math.abs(infoDict.calculatedAmount).toFixed(2)}
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={8}>
                                                <strong>Total:</strong>
                                            </Grid>
                                            <Grid item xs={4} sx={{ textAlign: 'end' }}>
                                                <strong>${totalAmount}</strong>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </StyledTabPanel>
                    <StyledTabPanel value={splitMethod} index={'P'}>
                        {splitMethod === 'P' && (
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                            Split in Percentage
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {splitDetail?.splitValues?.map((infoDict) => (
                                            <Grid
                                                container
                                                key={infoDict.user.email}
                                                sx={{ mt: 1 }}
                                            >
                                                <Grid
                                                    item
                                                    xs={1}
                                                    sx={{ display: 'flex', alignItems: 'start' }}
                                                >
                                                    <Checkbox
                                                        defaultChecked
                                                        sx={{ p: 0 }}
                                                        id={`included-${infoDict.user?.id}`}
                                                        onChange={handleIncludeChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {infoDict.user.display_name}
                                                </Grid>
                                                <Grid item xs={2} sx={{ textAlign: 'start' }}>
                                                    {`$ ${getUsersAmt(infoDict.user)}`}
                                                </Grid>
                                                <Grid item xs={3} sx={{ textAlign: 'end' }}>
                                                    {/* prettier-ignore */}
                                                    <TextField
                                                    id={`split-value-${infoDict.user?.id}`}
                                                    size='small'
                                                    variant='standard'
                                                    type='number'
                                                    value={infoDict.value || ''}
                                                    onChange={handleTextValueChange}
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position='start'>%</InputAdornment>,
                                                      }}
                                                />
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <Divider />
                                        <Grid container sx={{ mt: 1 }}>
                                            <Grid item xs={8}>
                                                <strong>Total:</strong>
                                            </Grid>
                                            <Grid item xs={4} sx={{ textAlign: 'end' }}>
                                                <strong>${calculatedTotalText}</strong>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </StyledTabPanel>
                    <StyledTabPanel value={splitMethod} index={'U'}>
                        {splitMethod === 'U' && (
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                            Split by unequal amounts
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {splitDetail?.splitValues?.map((infoDict) => (
                                            <Grid
                                                container
                                                key={infoDict.user.email}
                                                sx={{ mt: 1 }}
                                            >
                                                <Grid
                                                    item
                                                    xs={1}
                                                    sx={{ display: 'flex', alignItems: 'start' }}
                                                >
                                                    <Checkbox
                                                        defaultChecked
                                                        sx={{ p: 0 }}
                                                        id={`included-${infoDict.user?.id}`}
                                                        onChange={handleIncludeChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    {infoDict.user.display_name}
                                                </Grid>
                                                <Grid item xs={2} sx={{ textAlign: 'start' }}>
                                                    {`$ ${getUsersAmt(infoDict.user)}`}
                                                </Grid>
                                                <Grid item xs={2} sx={{ textAlign: 'end' }}>
                                                    <TextField
                                                        id={`split-value-${infoDict.user?.id}`}
                                                        size='small'
                                                        variant='standard'
                                                        type='number'
                                                        value={infoDict.value || ''}
                                                        onChange={handleTextValueChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <Divider />
                                        <Grid container sx={{ mt: 1 }}>
                                            <Grid item xs={8}>
                                                <strong>Total:</strong>
                                            </Grid>
                                            <Grid item xs={4} sx={{ textAlign: 'end' }}>
                                                <strong>${calculatedTotalText}</strong>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </StyledTabPanel>
                    <StyledTabPanel value={splitMethod} index={'S'}>
                        {splitMethod === 'S' && (
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant='h6' sx={{ fontWeight: 600 }}>
                                            Split in Shares
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {splitDetail?.splitValues?.map((infoDict) => (
                                            <Grid
                                                container
                                                key={infoDict.user.email}
                                                sx={{ mt: 1 }}
                                            >
                                                <Grid
                                                    item
                                                    xs={1}
                                                    sx={{ display: 'flex', alignItems: 'start' }}
                                                >
                                                    <Checkbox
                                                        defaultChecked
                                                        sx={{ p: 0 }}
                                                        id={`included-${infoDict.user?.id}`}
                                                        onChange={handleIncludeChange}
                                                    />
                                                </Grid>
                                                <Grid item xs={7}>
                                                    {infoDict.user.display_name}
                                                </Grid>
                                                <Grid item xs={2} sx={{ textAlign: 'start' }}>
                                                    {`$ ${getUsersAmt(infoDict.user)}`}
                                                </Grid>
                                                <Grid item xs={2} sx={{ textAlign: 'end' }}>
                                                    <TextField
                                                        id={`split-value-${infoDict.user?.id}`}
                                                        size='small'
                                                        variant='standard'
                                                        type='number'
                                                        value={infoDict.value || ''}
                                                        onChange={handleTextValueChange}
                                                    />
                                                </Grid>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12} sx={{ mt: 2 }}>
                                        <Divider />
                                        <Grid container sx={{ mt: 1 }}>
                                            <Grid item xs={8}>
                                                <strong>Total:</strong>
                                            </Grid>
                                            <Grid item xs={4} sx={{ textAlign: 'end' }}>
                                                <strong>${calculatedTotalText}</strong>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )}
                    </StyledTabPanel>
                </DialogContent>
            </Paper>
        </Grid>
    );
};

export default SplitDetailsDialog;
