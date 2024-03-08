import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import style from './AdminUploadPopUp.module.css'
import Rating from '@mui/material/node/Rating';
import { Link } from 'react-router-dom';
// import RateStars from './RateStars';


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
                    <h3>User1 uploaded material.</h3>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={style.DialogContent + " mt-2"}>
                        <div className='row text-center'>
                            <div className="col-md-5">
                                <h5>Subject : AI</h5>
                            </div>
                            <div className="col-md-4">
                                <h5>Week : 2</h5>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <button className='btn d-block m-auto mt-1'>Go To File</button>
                        </div>
                        <hr className={style.editLine}></hr>
                    </DialogContentText>

                    <div className={style.bottomBtns}>
                        <Button variant="contained" className={style.cancelBtn}>Decline</Button>
                        <Button variant="contained" className={style.submitBtn}>Accept</Button>
                    </div>
                </DialogContent>

                <DialogActions>
                    {/* <div className={style.bottomBtns}>
                        <Button variant="outlined" className={style.cancelBtn}>Cancel</Button>
                        <Button variant="contained" className={style.submitBtn}>Submit</Button>
                    </div> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}