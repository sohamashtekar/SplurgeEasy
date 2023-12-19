import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const CustomDialogHeader = styled(Grid)(({ theme }) => ({
    margin: 0,
    padding: '0.6em',
    backgroundColor: '#1976d2',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));
