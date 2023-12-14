import { Grid } from '@mui/material';

const CustomDialogPaperBlank = ({ children }) => {
    return (
        <Grid
            container
            direction={'row'}
            alignContent={'center'}
            justifyContent={'center'}
            style={{ height: '100dvh' }}
        >
            {children}
        </Grid>
    );
};

export default CustomDialogPaperBlank;
