import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import style from "../RateMaterial.module.css";
import Rating from "@mui/material/node/Rating";
import { Link } from "react-router-dom";
import RateStars from "../RateStars";

export default function BoxPopUp({ isOpen, onClose, mainText, btnColor }) {
  return (
    <div className="BoxPopUp">
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="m-auto col-lg-6 col-md-7 col-sm-12"
      >
        <DialogTitle id="alert-dialog-title" className={style.DialogTitle}>
          <h3>{mainText}</h3>
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className={style.DialogContent}
          >
            <hr className={style.editLine}></hr>
            <div class="mb-3">
              <textarea
                class={style.editTextArea + " form-control"}
                id="exampleFormControlTextarea1"
                rows="5"
                placeholder="Write Your Message."
              ></textarea>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div className={style.bottomBtns}>
            <Button variant="outlined">Cancel</Button>
            <Button variant="contained" color={btnColor}>
              Submit
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
