import { styled } from '@mui/material/styles';

export const SummaryTitle = styled('div')(({ theme }) => ({
    fontSize: '5dvw',
    fontWeight: 600,
    [theme.breakpoints.up('md')]: {
        fontSize: '3dvw',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '2.7dvw',
    },
}));
