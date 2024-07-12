import React, { useEffect, useState } from "react";
import "./uploadMaterials.css";
import { Fab, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material/node";
import axios from "axios";
import { baseBackendUrl } from "../../utils/baseBackendUrl";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "../../components/Toast";

function UploadMaterials() {
  const sessionId = localStorage.getItem("sessionId");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionId}`,
    },
  };

  const FORM_VALIDATION = Yup.object({
    title: Yup.string().required("Materials Title is required"),
    courseID: Yup.number()
      .typeError("Course Name is required")
      .required("Course Name is required"),
    fileURL: Yup.string().required("materials Link is required"),
  });

  const INITIAL_FORM_STATE = {
    courseID: 0,
    title: "",
    fileURL: "",
    fileType: "PDF",
    fileSize: 1000,
  };

  const formik = useFormik({
    initialValues: INITIAL_FORM_STATE,
    validationSchema: FORM_VALIDATION,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${baseBackendUrl}/materials/upload`,
          values,
          config
        );
        Toast({ title: "Materials Uploaded Successfully", icon: "success" });
      } catch (error) {
        Toast({ title: error.response.data.message, icon: "error" });
      }
    },
  });

  const [allCourses, setAllCourses] = useState([]);
  const getAllCourses = async () => {
    try {
      const response = await axios.get(`${baseBackendUrl}/courses/`, config);
      const data = response.data.Courses;
      setAllCourses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <section className="UploadMaterials">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="title">Upload Material</h1>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="row my-4 firstRow">
            <div className="col-xl-4">
              <div className="d-flex flex-column ">
                {/* <p className="mb-0 inputLabel">Title :</p> */}
                <TextField
                  id="outlined-textarea"
                  label={"Title"}
                  placeholder={"Write Materials Title "}
                  fullWidth
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </div>
            </div>

            <div className="col-xl-4">
              <div className="d-flex flex-column ">
                {/* <p className="mb-0 inputLabel">Subject :</p> */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" className="w-100">
                    Course Name
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="courseID"
                    label={"Course Name"}
                    className="select"
                    name="courseID"
                    value={formik.values.courseID}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {allCourses.map((item) => {
                      return (
                        <MenuItem key={item.courseId} value={item.courseId}>
                          {item.courseName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {formik.touched.courseID && formik.errors.courseID ? (
                    <div className="mt-2 ps-2 text-danger">
                      {formik.errors.courseID}
                    </div>
                  ) : null}
                </FormControl>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="d-flex flex-column ">
                {/* <p className="mb-0 inputLabel">Title :</p> */}
                <TextField
                  id="outlined-textarea"
                  label={"Material Link"}
                  placeholder={"Paste Material Link "}
                  fullWidth
                  name="fileURL"
                  value={formik.values.fileURL}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.fileURL && Boolean(formik.errors.fileURL)
                  }
                  helperText={formik.touched.fileURL && formik.errors.fileURL}
                />
              </div>
            </div>
          </div>
          <hr />

          <div className="buttonsDiv  mb-5">
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

        {/* 
        <div className="row my-4 secondRow">
          <div className="col-12">
            <div className="">

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
        </div> */}

        {/* <div className="row my-4 thirdRow">
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
        </div> */}

        {/* <div className="row my-4 fourthRow">
          <div className="col-xl-6">
            <div className="w-100">
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
        </div> */}
      </div>
    </section>
  );
}

export default UploadMaterials;
