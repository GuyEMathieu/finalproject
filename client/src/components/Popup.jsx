import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Grid, Divider, Button
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 2,
    p: 2,
};

export default function Popup(props) {

    return (

        <Modal
            open={props.open}
            // onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container spacing={1} justifyContent={'center'}>
                    <Grid item xs={12}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                            {props.title}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider  />
                    </Grid>
                    <Grid item xs={12}>
                        {props.children}
                    </Grid>

                    <Grid item >
                        <Button
                            onClick={props.handleClose}
                            fullWidth={false}>
                            Close
                        </Button> 
                    </Grid>

                </Grid>
                
            </Box>

        </Modal>
    );
}
