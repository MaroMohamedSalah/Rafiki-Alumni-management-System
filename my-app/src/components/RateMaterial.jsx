import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
<<<<<<<< HEAD:my-app/src/components/RateMaterial.jsx
import style from './RateMaterial.module.css'
import Rating from '@mui/material/node/Rating';
========
import Lottie from 'lottie-react'
import style from './UploadMaterialsPopUp.module.css'
>>>>>>>> cd385551a83bd28ea5719b66f0945d6fcc9df5d4:my-app/src/components/UploadMaterialsPopUp.jsx
import { Link } from 'react-router-dom';
import RateStars from './RateStars';

<<<<<<<< HEAD:my-app/src/components/RateMaterial.jsx

export default function RateMaterial() {
========
export default function UploadMaterialsPopUp({ isOpen, onClose, mainText, btnText, animation }) {
>>>>>>>> cd385551a83bd28ea5719b66f0945d6fcc9df5d4:my-app/src/components/UploadMaterialsPopUp.jsx


    return (
<<<<<<<< HEAD:my-app/src/components/RateMaterial.jsx
        <div className='RateMaterialPopUp'>
            <Button variant="contained" onClick={handleClickOpen} className='d-block m-auto mt-5'>
                Submit
            </Button>
========
        <React.Fragment>
>>>>>>>> cd385551a83bd28ea5719b66f0945d6fcc9df5d4:my-app/src/components/UploadMaterialsPopUp.jsx
            <Dialog
                open={isOpen}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='m-auto col-lg-6 col-md-7 col-sm-12'
            >
<<<<<<<< HEAD:my-app/src/components/RateMaterial.jsx

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
========
                <DialogTitle id="alert-dialog-title" className='p-1 pt-4 pb-4'>
                    <Lottie loop={false} animationData={animation} className='w-25 d-block m-auto'></Lottie>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" className={style.editContent + ' text-center'}>
                        <h4>{mainText}</h4>
                        <h5>Thank you for your participation</h5>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    {btnText ? <Button className={style.btnConfig + " m-auto mb-4 w-50 p-3 text-white"}>
                        {btnText}
                    </Button> : ""}


                    {/* <Link
                        to="./"
                        variant="contained"
                        className={style.btnConfig + " m-auto mb-4 w-50 p-3 text-white"}
                    >
                        Home page
                    </Link> */}


                </DialogActions>
            </Dialog >
        </React.Fragment >
>>>>>>>> cd385551a83bd28ea5719b66f0945d6fcc9df5d4:my-app/src/components/UploadMaterialsPopUp.jsx
    );
}
