import React, { useState } from 'react';
import { Alert, Snackbar, Typography } from '@mui/material';

function CustomAlert(props) {
    const vertical = props.vertical || 'bottom';
    const horizontal = props.horizontal || 'center';
    const open = props.open || false;
    const setOpen = props.setOpen || null;
    const message = props.message;
    const severity = props.severity;
    const subText = props.subText || '';
    const action = props.action || null;

    const handleClose = () => {
        setOpen && setOpen(false);
    };

    return (
        <Snackbar
            autoHideDuration={600000}
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            key={vertical + horizontal}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} action={action}>
                {message}
                {subText && (
                    <>
                        <br />
                        <Typography variant='p' color='initial' style={{ fontSize: '12px' }}>
                            <strong>{subText}</strong>
                        </Typography>
                    </>
                )}
            </Alert>
        </Snackbar>
    );
}

export default CustomAlert;
