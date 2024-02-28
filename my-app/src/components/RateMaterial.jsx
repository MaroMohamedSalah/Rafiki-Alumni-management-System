import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import style from './RateMaterial.module.css'
import Rating from '@mui/material/node/Rating';
import { Link } from 'react-router-dom';
import RateStars from './RateStars';


export default function RateMaterial() {


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='RateMaterialPopUp'>
            <Button variant="contained" onClick={handleClickOpen} className='d-block m-auto mt-5'>
                Submit
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='m-auto col-lg-6 col-md-7 col-sm-12'
            >

                <DialogTitle id="alert-dialog-title" className={style.DialogTitle}>
                    <h3>Your opinion matters to us!</h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={style.DialogContent}>
                        <h4>How many stars can you give This Material?</h4>
                        <RateStars />
                        <hr className={style.editLine}></hr>
                        <h4>Your opinion will help the writer to improve.</h4>
                        <div class="mb-3">
                            <textarea class={style.editTextArea + " form-control"} id="exampleFormControlTextarea1" rows="5" placeholder='Any additional Feedback please type it here.'></textarea>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <div className={style.bottomBtns}>
                        <Button variant="outlined" className={style.cancelBtn}>Cancel</Button>
                        <Button variant="contained" className={style.submitBtn}>Submit</Button>
                    </div>

                </DialogActions>
            </Dialog>
        </div>
    );
}