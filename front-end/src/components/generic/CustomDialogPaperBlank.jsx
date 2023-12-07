import { Grid } from '@mui/material';

const CustomDialogPaperBlank = ({ children }) => {
    return (
        <Grid
            container
            spacing={2}
            justifyContent={'center'}
            alignItems={'center'}
            style={{ height: '100%' }}
        >
            {children}
        </Grid>
    );
};

export default CustomDialogPaperBlank