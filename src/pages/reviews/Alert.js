import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alertita from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';


function Alert({ message, onCloseCallback }) {

    const popOverPosition = { vertical: 'top', horizontal: 'center' }

    if (message == null) {
        return null;
    }

    return (

        <Snackbar
            autoHideDuration={9000}
            anchorOrigin={popOverPosition}
            open={true}
            onClose={onCloseCallback}
            key={popOverPosition.vertical + popOverPosition.horizontal}
        >
            <Alertita variant="filled" onClose={onCloseCallback} severity="error" action={
                <Button color="inherit" size="small" onClick={onCloseCallback}>
                    ✖
                </Button>
            }>
                {message}
            </Alertita>
        </Snackbar>
    );
}

export default Alert;