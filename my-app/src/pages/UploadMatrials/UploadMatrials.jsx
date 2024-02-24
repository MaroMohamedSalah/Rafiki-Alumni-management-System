import React from "react";
import "./uploadMatrials.css";
import { Fab, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material/node";

function UploadMatrials() {
  return (
    <section className="uploadMaterial">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">Upload Material</h1>
          </div>
        </div>

        <div className="row my-4 firstRow">
          <div className="col-xl-5">
            <div className="d-flex flex-column ">
              <p className="mb-0 inputLabel">Title :</p>
              <TextField id="outlined-basic" label="*" variant="outlined" />
            </div>
          </div>

          <div className="col-xl-4">
            <div className="d-flex flex-column ">
              <p className="mb-0 inputLabel">Subject :</p>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="*"
                  // onChange={handleChange}
                  style={{ height: "44px" }}
                  className="select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="d-flex flex-column ">
              <p className="mb-0 inputLabel">Week :</p>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">*</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="*"
                  // onChange={handleChange}
                  style={{ height: "44px" }}
                  className="select"
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>

        <div className="row my-4 secondRow">
          <div className="col-12">
            <div className="">
              <p className="inputLabel mb-0">Description :</p>
              {/* <div className="descriptionDiv"> */}
              <TextField
                id="filled-multiline-static"
                // label="Multiline"
                multiline
                rows={4}
                defaultValue="Description"
                variant="filled"
                className="w-100"
              />
              {/* </div> */}
            </div>
          </div>
        </div>

        <div className="row my-4 thirdRow">
          <div className="col-12">
            <div className="">
              <p className="fileLabel mb-0">File :</p>
              <div className="fileDiv">
                <Fab
                  variant="extended"
                  style={{
                    background: "#4D85FF",
                    color: "#fff",
                    padding: "8px 36px",
                    width: "190px",
                    height: "51px",
                  }}
                >
                  Browse
                </Fab>
                <p className="mb-0">Files Must be in format ppt , pdf</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-4 fourthRow">
          <div className="col-xl-6">
            <div className="w-100">
              <p className="file_label mb-0">Link :</p>
              <TextField
                id="outlined-basic"
                label="*"
                variant="outlined"
                className="w-100"
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="w-100">
              <p className="file_label mb-0">Description :</p>
              <TextField
                id="outlined-basic"
                label="*"
                variant="outlined"
                className="w-100"
              />
            </div>
          </div>
          <p className="my-3">
            *PRO TIP : you can add a link if you are Summarizes the lecturers on
            YouTube or any other platform.
          </p>
          <hr />
        </div>

        <div className="buttonsDiv  mb-5">
          <div className="div">
            <Button
              variant="outlined"
              style={{
                width: "292px",
                height: "60px",
                borderRadius: "8px",
                padding: "8px 36px",
                borderColor: "#1A4B96",
                color: "#1A4B96",
              }}
            >
              Outlined
            </Button>
          </div>
          <div className="div">
            <Button
              variant="contained"
              style={{
                width: "292px",
                height: "60px",
                borderRadius: "8px",
                padding: "8px 36px",
                color: "#fff",
                background: "#1A4B96",
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UploadMatrials;
