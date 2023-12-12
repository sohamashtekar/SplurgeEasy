import { styled } from '@mui/material/styles';

export const ExpenseTitle = styled('div')(({ theme }) => ({
    fontSize: '3.4dvw',
    [theme.breakpoints.up('md')]: {
        fontSize: '1.7dvw',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.4dvw',
    },
}));

export const ExpenseAmountPay = styled('span')(({ theme }) => ({
    fontSize: '3dvw',
    color: '#f44336',
    [theme.breakpoints.up('md')]: {
        fontSize: '1.5dvw',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.2dvw',
    },
}));

export const ExpenseAmountGet = styled('span')(({ theme }) => ({
    fontSize: '3dvw',
    color: '#00e676',
    [theme.breakpoints.up('md')]: {
        fontSize: '1.5dvw',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '1.2dvw',
    },
}));
