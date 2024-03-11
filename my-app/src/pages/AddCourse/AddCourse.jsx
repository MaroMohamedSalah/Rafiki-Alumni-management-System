import React, { useState } from "react";
import "./addCourse.css";
import {
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddCourse = () => {
  // ADD Another link Functions
  const [links, setLinks] = useState([{ id: 1 }]);
  const addLink = () => {
    const newLinks = [...links, { id: links.length + 1 }];
    setLinks(newLinks);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selected file:", file);
  };

  const FORM_VALIDATION = Yup.object().shape({
    courseName: Yup.string().required("Course Name is required"),
    professorsName: Yup.string().required("Professor's Name is required"),
    department: Yup.string().required("Department is required"),
    creditHours: Yup.string().required("Credit Hours is required"),
    prerequisite: Yup.string().required("Prerequisite is required"),
    Image: Yup.string(),
    importantLink1: Yup.string(),
    importantLink2: Yup.string(),
    anotherLink: Yup.string(),
    anotherLinkDescription: Yup.string(),
  });

  const INITIAL_FORM_STATE = {
    courseName: "",
    professorsName: "",
    department: "",
    creditHours: "",
    prerequisite: "",
    Image: "",
    importantLink1: "",
    importantLink2: "",
    anotherLink: "",
    anotherLinkDescription: "",
  };

  return (
    <section className="AddCourse">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">Add Course Details</h1>
          </div>
        </div>

        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <div className="row my-4 firstRow">
              <div className="col-xl-5">
                <div className="d-flex flex-column  ">
                  <Field
                    as={TextField}
                    id="outlined-textarea"
                    label={"Course Name"}
                    placeholder={"Add Course Name "}
                    fullWidth
                    required
                    name="courseName"
                  />
                  <ErrorMessage
                    className="mt-2 ps-2 text-danger"
                    name="professorsName"
                    component="div"
                  />
                </div>
              </div>

              <div className="col-xl-4">
                <div className="d-flex flex-column ">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" className="w-100">
                      Professor's Name
                    </InputLabel>
                    <Field
                      as={Select}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={"Professor's Name"}
                      className="select"
                      name="professorsName"
                      required
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Field>
                    <ErrorMessage
                      className="mt-2 ps-2 text-danger"
                      name="professorsName"
                      component="div"
                    />
                  </FormControl>
                </div>
              </div>

              <div className="col-xl-3">
                <div className="d-flex flex-column ">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Department
                    </InputLabel>
                    <Field
                      as={Select}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Department"
                      className="select"
                      name="department"
                      required
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Field>
                    <ErrorMessage
                      className="mt-2 ps-2 text-danger"
                      name="department"
                      component="div"
                    />
                  </FormControl>
                </div>
              </div>
            </div>

            <div className="row my-4 secondRow">
              <div className="col-xl-3">
                <div className="d-flex flex-column ">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Credit Hours
                    </InputLabel>
                    <Field
                      as={Select}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Department"
                      className="select"
                      name="creditHours"
                      required
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Field>
                    <ErrorMessage
                      className="mt-2 ps-2 text-danger"
                      name="creditHours"
                      component="div"
                    />
                  </FormControl>
                </div>
              </div>

              <div className="col-xl-5">
                <div className="d-flex flex-column ">
                  <Field
                    as={TextField}
                    id="outlined-textarea"
                    label={"Prerequisite"}
                    placeholder={
                      " Add the Prerequisite to This Course if There isn’t Type N/A"
                    }
                    fullWidth
                    required
                    name="prerequisite"
                  />
                  <ErrorMessage
                    className="mt-2 ps-2 text-danger"
                    name="prerequisite"
                    component="div"
                  />
                </div>
              </div>
            </div>

            <div className="row my-4 thirdRow">
              <div className="col-12">
                <div className="">
                  <p className="imageLabel mb-0">Image to the Course:</p>
                  <div className="imageDiv">
                    <label htmlFor="upload-photo">
                      <Fab
                        style={{ height: "45px" }}
                        variant="extended"
                        component="span"
                        className="browse"
                      >
                        Browse
                      </Fab>
                    </label>
                    <input
                      type="file"
                      id="upload-photo"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      accept="image/*"
                      name="Image"
                    />
                    <p className="mb-0">
                      Images Must be in format JPG, JPEG, PNG
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row my-4 fourthRow">
              <h1 className="title py-3">Important Links</h1>
              <div className="col-xl-6">
                <div className="w-100">
                  <TextField
                    id="outlined-textarea"
                    label={"WhatsApp Group Link"}
                    placeholder={
                      " add the WhatsApp Group link to this course if there isn’t type N/A "
                    }
                    fullWidth
                    name="importantLink1"
                  />
                </div>
              </div>
              <div className="col-xl-6">
                <div className="w-100">
                  <TextField
                    id="outlined-basic"
                    label="Microsoft Teams code"
                    placeholder={
                      " add the Microsoft Teams code to this course if there isn’t type N/A "
                    }
                    variant="outlined"
                    className="w-100"
                    name="importantLink2"
                  />
                </div>
              </div>
            </div>
            <hr className="fourthRowLine" />

            <div className="row mb-4  ">
              <h1 className="title py-3">Other Links</h1>
              <div>
                <div>
                  {links.map((link) => {
                    return (
                      <div key={link.id} className="row my-4 fourthRow">
                        <div className="col-xl-6">
                          <div className="w-100">
                            <TextField
                              id={`outlined-textarea-${link.id}`}
                              label="Link"
                              placeholder="Add a link like the official channel of this course on youtube, etc."
                              fullWidth
                              name="anotherLink"
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="w-100">
                            <TextField
                              id={`outlined-basic-${link.id}`}
                              label="Description :"
                              placeholder="add a description to this link like what’s this link is about"
                              variant="outlined"
                              className="w-100"
                              name="anotherLinkDescription"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <Fab
                    variant="extended"
                    style={{
                      background: "#4D85FF",
                      color: "#fff",
                      height: "40px",
                      margin: "20px 13px 5px 13px",
                      position: "relative",
                      zIndex: "1",
                    }}
                    onClick={addLink}
                  >
                    <AddCircleOutlineOutlined
                      style={{
                        background: "#fff",
                        color: "#4D85FF",
                        padding: "5px 0",
                        borderRadius: "5px",
                        fontSize: "30px",
                      }}
                      sx={{ mr: 1 }}
                    />
                    Add another Link
                  </Fab>
                </div>
              </div>
              <p className="my-3">
                *PRO TIP : you can add a link if you are Summarizes the
                lecturers on YouTube or any other platform.
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
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default AddCourse;
