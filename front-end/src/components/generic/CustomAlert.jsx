import React, { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

function CustomAlert(props) {
    const [state, setState] = useState({
        open: props.open,
        vertical: props.vertical || 'bottom',
        horizontal: props.horizontal || 'center',
    });

    const { vertical, horizontal, open } = state;
    const message = props.message;
    const severity = props.severity;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <Snackbar
            autoHideDuration={600000}
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            key={vertical + horizontal}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                sx={{ width: '100%' }}
                action={props.action}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomAlert;
