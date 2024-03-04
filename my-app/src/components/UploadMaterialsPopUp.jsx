import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Lottie from 'lottie-react'
import animation from '../../animations/successfully done.json'
import style from './UploadMaterialsPopUp.module.css'
import { Link } from 'react-router-dom';

export default function UploadMaterialsPopUp({ isOpen, onClose }) {


    return (
        <React.Fragment>
            <Dialog
                open={isOpen}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='m-auto col-lg-6 col-md-7 col-sm-12'
            >
                <DialogTitle id="alert-dialog-title" className='p-1 pt-4 pb-4'>
                    <Lottie loop={false} animationData={animation} className='w-25 d-block m-auto'></Lottie>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={style.editContent + ' text-center'}>
                        <h4>Your Materiel Is under review</h4>
                        <h5>Thank you for your participation</h5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button className={style.btnConfig + " m-auto mb-4 w-50 p-3 text-white"}>
                        Home page
                    </Button>

                    {/* <Link
                        to="./"
                        variant="contained"
                        className={style.btnConfig + " m-auto mb-4 w-50 p-3 text-white"}
                    >
                        Home page
                    </Link> */}


                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
