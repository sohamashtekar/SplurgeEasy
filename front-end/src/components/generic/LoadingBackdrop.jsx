import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingBackdrop(props) {
    const open = props?.open || false;
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <CircularProgress color='inherit' />
        </Backdrop>
    );
}

export default LoadingBackdrop;
