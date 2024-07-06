import React, { useState } from "react";
import "./addCourse.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseBackendUrl } from "../../utils/baseBackendUrl";
import Toast from "../../components/Toast";

const AddCourse = () => {
  const FORM_VALIDATION = Yup.object({
    courseName: Yup.string().required("Course Name is required"),
    teamsCode: Yup.string().required("Teams Code is required"),
    doctorName: Yup.string().required("Doctor Name is required"),
    lectureDay: Yup.string().required("Lecture Day is required"),
    lectureTime: Yup.string().required("Lecture Time is required"),
  });

  const INITIAL_FORM_STATE = {
    courseName: "",
    teamsCode: "",
    doctorName: "",
    lectureDay: "",
    lectureTime: "",
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: async (values) => {
      try {
        const sessionId = localStorage.getItem("sessionId");
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionId}`,
          },
        };

        const response = await axios.post(
          `${baseBackendUrl}/courses/`,
          values,
          config
        );
        Toast({ title: "Course Added Successfully", icon: "success" });
      } catch (error) {
        Toast({ title: error.response.data.message, icon: "error" });
      }
    },
  });

  return (
    <section className="AddCourse">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">Add Course Details</h1>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="row my-4 firstRow">
            <div className="col-xl-5">
              <div className="d-flex flex-column  ">
                <TextField
                  fullWidth
                  label={"Course Name"}
                  placeholder={"Add Course Name "}
                  id="courseName"
                  name="courseName"
                  value={formik.values.courseName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.courseName &&
                    Boolean(formik.errors.courseName)
                  }
                  helperText={
                    formik.touched.courseName && formik.errors.courseName
                  }
                />
              </div>
            </div>

            <div className="col-xl-4">
              <div className="d-flex flex-column ">
                <TextField
                  id="teamsCode"
                  label={"Teams Code"}
                  placeholder={"Teams Code"}
                  fullWidth
                  name="teamsCode"
                  value={formik.values.teamsCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.teamsCode && Boolean(formik.errors.teamsCode)
                  }
                  helperText={
                    formik.touched.teamsCode && formik.errors.teamsCode
                  }
                />
              </div>
            </div>

            <div className="col-xl-3">
              <div className="d-flex flex-column ">
                <TextField
                  id="doctorName"
                  label={"Doctor Name"}
                  placeholder={"Doctor Name"}
                  fullWidth
                  name="doctorName"
                  value={formik.values.doctorName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.doctorName &&
                    Boolean(formik.errors.doctorName)
                  }
                  helperText={
                    formik.touched.doctorName && formik.errors.doctorName
                  }
                />
              </div>
            </div>
          </div>

          <div className="row my-4 secondRow">
            <div className="col-xl-6">
              <div className="d-flex flex-column ">
                <FormControl
                  fullWidth
                  error={
                    formik.touched.lectureDay &&
                    Boolean(formik.errors.lectureDay)
                  }
                >
                  <InputLabel id="lecture-day-label">Lecture Day</InputLabel>
                  <Select
                    labelId="lecture-day-label"
                    id="lectureDay"
                    label="Lecture Day"
                    name="lectureDay"
                    value={formik.values.lectureDay}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="">Saturday</MenuItem>
                    <MenuItem value="Sunday">Sunday</MenuItem>
                    <MenuItem value="Monday">Monday</MenuItem>
                    <MenuItem value="Tuesday">Tuesday</MenuItem>
                    <MenuItem value="Wednesday">Wednesday</MenuItem>
                    <MenuItem value="Thursday">Thursday</MenuItem>
                  </Select>
                  {formik.touched.lectureDay && formik.errors.lectureDay ? (
                    <div className="mt-2 ps-2 text-danger">
                      {formik.errors.lectureDay}
                    </div>
                  ) : null}
                </FormControl>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="d-flex flex-column ">
                <FormControl
                  fullWidth
                  error={
                    formik.touched.lectureTime &&
                    Boolean(formik.errors.lectureTime)
                  }
                >
                  <InputLabel id="lecture-time-label">Lecture Time</InputLabel>
                  <Select
                    labelId="lecture-time-label"
                    id="lectureTime"
                    name="lectureTime"
                    label="Lecture Time"
                    value={formik.values.lectureTime}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="8:00">8:00</MenuItem>
                    <MenuItem value="10:00">10:00</MenuItem>
                    <MenuItem value="12:00">12:00</MenuItem>
                    <MenuItem value="2:00">2:00</MenuItem>
                    <MenuItem value="4:00">4:00</MenuItem>
                    <MenuItem value="6:00">6:00</MenuItem>
                  </Select>
                  {formik.touched.lectureTime && formik.errors.lectureTime ? (
                    <div className="mt-2 ps-2 text-danger">
                      {formik.errors.lectureTime}
                    </div>
                  ) : null}
                </FormControl>
              </div>
            </div>
          </div>

          <hr className="fourthRowLine" />

          <div className="buttonsDiv  my-5">
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
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddCourse;
