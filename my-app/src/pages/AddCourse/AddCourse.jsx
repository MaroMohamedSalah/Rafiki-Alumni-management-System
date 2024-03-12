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
import axios from "axios";
import { baseBackendUrl } from "../../utils/baseBackendUrl";
import Toast from "../../components/Toast";

const AddCourse = () => {
  // ADD Another link Functions
  // const [links, setLinks] = useState([{ id: 1 }]);
  // const addLink = () => {
  //   const newLinks = [...links, { id: links.length + 1 }];
  //   setLinks(newLinks);
  // };

  const FORM_VALIDATION = Yup.object().shape({
    courseName: Yup.string().required("Course Name is required"),
    teamsCode: Yup.string().required("Teams Code is required"),
    doctorName: Yup.string().required("Doctor Name is required"),
    lectureDay: Yup.string().required("Lecture Day is required"),
    lectureTime: Yup.string().required("Lecture Time is required"),

    // importantLink1: Yup.string(),
    // importantLink2: Yup.string(),
    // anotherLink: Yup.string(),
    // anotherLinkDescription: Yup.string(),
  });

  const INITIAL_FORM_STATE = {
    courseName: "",
    teamsCode: "",
    doctorName: "",
    lectureDay: "",
    lectureTime: "",
    // importantLink1: "",
    // importantLink2: "",
    // anotherLink: "",
    // anotherLinkDescription: "",
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
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            const data = JSON.stringify(values);
            const sessionId = localStorage.getItem("sessionId");
            axios
              .post(`${baseBackendUrl}/courses/`, data, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${sessionId}`,
                },
              })
              .then((response) => {
                console.log("Form data submitted successfully:", response.data);
                Toast({
                  title: "Added Successfully.",
                  icon: "success",
                });
              })
              .catch((error) => {
                Toast({
                  title: "Something Went Wrong.",
                  icon: "error",
                });
                console.log("Error submitting form data:", error);
              })
              .finally(() => {
                setSubmitting(false);
              });
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
                    name="courseName"
                  />
                  <ErrorMessage
                    className="mt-2 ps-2 text-danger"
                    name="courseName"
                    component="div"
                  />
                </div>
              </div>

              <div className="col-xl-4">
                <div className="d-flex flex-column ">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" className="w-100">
                      Doctor Name
                    </InputLabel>
                    <Field
                      as={Select}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={"Doctor Name "}
                      className="select"
                      name="doctorName"
                    >
                      <MenuItem value="Ten">Ten</MenuItem>
                      <MenuItem value="Twenty">Twenty</MenuItem>
                      <MenuItem value="Thirty">Thirty</MenuItem>
                    </Field>
                    <ErrorMessage
                      className="mt-2 ps-2 text-danger"
                      name="doctorName"
                      component="div"
                    />
                  </FormControl>
                </div>
              </div>

              <div className="col-xl-3">
                <div className="d-flex flex-column ">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Lecture Day
                    </InputLabel>
                    <Field
                      as={Select}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Lecture Day"
                      className="select"
                      name="lectureDay"
                    >
                      <MenuItem value="Saturday">Saturday</MenuItem>
                      <MenuItem value="Sunday">Sunday</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                    </Field>
                    <ErrorMessage
                      className="mt-2 ps-2 text-danger"
                      name="lectureDay"
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
                    <Field
                      as={TextField}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Teams Code"
                      className="select"
                      name="teamsCode"
                      placeholder={" Teams Code"}
                    ></Field>
                    <ErrorMessage
                      className="mt-2 ps-2 text-danger"
                      name="teamsCode"
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
                    label={"Lecture Time"}
                    placeholder={" Lecture Time"}
                    fullWidth
                    name="lectureTime"
                  />
                  <ErrorMessage
                    className="mt-2 ps-2 text-danger"
                    name="lectureTime"
                    component="div"
                  />
                </div>
              </div>
            </div>

            {/* <div className="row my-4 thirdRow">
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
                      // onChange={(event) =>
                      //   handleFileChange(event, setFieldValue)
                      // }
                      accept="image/*"
                      name="Image"
                    />
                    <p className="mb-0">
                      Images Must be in format JPG, JPEG, PNG
                    </p>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div className="row my-4 fourthRow">
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
            </div> */}
            <hr className="fourthRowLine" />

            {/* <div className="row mb-4  ">
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
            </div> */}

            <div className="buttonsDiv  my-5">
              <Button
                type="submit"
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
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default AddCourse;
