import React from "react";
import "./addCourse.css";
import {
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material/node";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

const AddCourse = () => {
  return (
    <section className="AddCourse">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">Add Course Details</h1>
          </div>
        </div>
        <div className="row my-4 firstRow">
          <div className="col-xl-5">
            <div className="d-flex flex-column ">
              {/* <p className="mb-0 inputLabel">Title :</p> */}
              <TextField
                id="outlined-textarea"
                label={"Course Name"}
                placeholder={"Add Course Name "}
                fullWidth
              />
            </div>
          </div>

          <div className="col-xl-4">
            <div className="d-flex flex-column ">
              {/* <p className="mb-0 inputLabel">Subject :</p> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" className="w-100">
                  Professor's Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={"Professor's Name"}
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
                <InputLabel id="demo-simple-select-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Department"
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
          <div className="col-xl-3">
            <div className="d-flex flex-column ">
              {/* <p className="mb-0 inputLabel">Week :</p> */}
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Credit Hours
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Department"
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

          <div className="col-xl-5">
            <div className="d-flex flex-column ">
              {/* <p className="mb-0 inputLabel">Title :</p> */}
              <TextField
                id="outlined-textarea"
                label={"Prerequisite"}
                placeholder={
                  " Add the Prerequisite to This Course if There isn’t Type N/A"
                }
                fullWidth
              />
            </div>
          </div>
        </div>
        <div className="row my-4 secondRow">
          <div className="col-12">
            <div className="">
              {/* <p className="inputLabel mb-0">Description :</p> */}

              <TextField
                id="outlined-textarea"
                label="About The Course "
                placeholder="Add Description to This Course Content"
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
              <p className="imageLabel mb-0">Image to the Course:</p>
              <div className="imageDiv">
                <Fab variant="extended">Browse</Fab>
                <p className="mb-0">Images Must be in format JPG, JPEG, PNG</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row my-4 fourthRow">
          <h1 className="title py-3">Important Links</h1>
          <div className="col-xl-6">
            <div className="w-100">
              {/* <p className="file_label mb-0">Link :</p> */}
              <TextField
                id="outlined-textarea"
                label={"WhatsApp Group Link"}
                placeholder={
                  " add the WhatsApp Group link to this course if there isn’t type N/A "
                }
                fullWidth
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="w-100">
              {/* <p className="file_label mb-0">Description :</p> */}
              <TextField
                id="outlined-basic"
                label="Microsoft Teams code"
                placeholder={
                  " add the Microsoft Teams code to this course if there isn’t type N/A "
                }
                variant="outlined"
                className="w-100"
              />
            </div>
          </div>
        </div>
        <hr className="fourthRowLine" />

        <div className="row mb-4  fourthRow">
          <h1 className="title py-3">Other Links</h1>
          <div className="col-xl-6">
            <div className="w-100">
              {/* <p className="file_label mb-0">Link :</p> */}
              <TextField
                id="outlined-textarea"
                label={"Link"}
                placeholder={
                  " Add a link like the official channel of this course on youtube, etc. "
                }
                fullWidth
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="w-100">
              {/* <p className="file_label mb-0">Description :</p> */}
              <TextField
                id="outlined-basic"
                label="Description :"
                placeholder={
                  " add a description to this link like what’s this link is about"
                }
                variant="outlined"
                className="w-100"
              />
            </div>
          </div>
          <Fab
            variant="extended"
            style={{
              background: "#4D85FF",
              color: "#fff",
              height: "35px",
              margin: "20px 13px 5px 13px",
              position: "relative",
              zIndex: "1",
            }}
          >
            <AddCircleOutlineOutlined
              style={{
                background: "#fff",
                color: "#4D85FF",
                padding: "5px 0",
                borderRadius: "5px",
                fontSize: "26px",
              }}
              sx={{ mr: 1 }}
            />
            Add another Link
          </Fab>

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
};

export default AddCourse;
