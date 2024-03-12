import React from "react";
import "./uploadMaterials.css";
import { Fab, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material/node";

function UploadMaterials() {
  return (
    <section className="UploadMaterials">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">Upload Material</h1>
          </div>
        </div>

        <div className="row my-4 firstRow">
          <div className="col-xl-5">
            <div className="d-flex flex-column ">
              {/* <p className="mb-0 inputLabel">Title :</p> */}
              <TextField
                id="outlined-textarea"
                label={"Title"}
                placeholder={"Write Materials Title "}
                fullWidth
              />
            </div>
          </div>

          <div className="col-xl-4">
            <div className="d-flex flex-column ">
              {/* <p className="mb-0 inputLabel">Subject :</p> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" className="w-100">
                  Subject
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={"Subject"}
                  // style={{ height: "44px" }}
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
              {/* <p className="mb-0 inputLabel">Week :</p> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Week</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Week"
                  // onChange={handleChange}
                  className="select"
                  // style={{ height: "44px" }}
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
              {/* <p className="inputLabel mb-0">Description :</p> */}

              <TextField
                id="outlined-textarea"
                label="Description"
                placeholder="Write Description"
                multiline
                className="col-xl-12 multilineInput"
                rows={"4"}
              />
            </div>
          </div>
        </div>

        <div className="row my-4 thirdRow">
          <div className="col-12">
            <div className="">
              <p className="fileLabel mb-0">File :</p>
              <div className="fileDiv">
                <Fab variant="extended" className="fileButton">
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
              {/* <p className="file_label mb-0">Link :</p> */}
              <TextField
                id="outlined-textarea"
                label={"Link"}
                placeholder={"Write Materials Link "}
                fullWidth
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="w-100">
              {/* <p className="file_label mb-0">Description :</p> */}
              <TextField
                id="outlined-basic"
                label="Description"
                placeholder={"Write Materials Description "}
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
                width: "215px",
                height: "52px",
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
                width: "215px",
                height: "52px",
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

export default UploadMaterials;