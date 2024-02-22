import React from "react";
import "./uploadMatrials.css";
import { Fab } from "@mui/material";
import Button from "@mui/material/Button";

function UploadMatrials() {
  return (
    <section className="upload_material">
      <div className="container-xxl">
        <div className="row">
          <div className="col">
            <h1 className="title">Upload Material</h1>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-5">
            <div className="d-flex flex-column ">
              <p className="mb-0 input_label">Title :</p>
              <input type="text" placeholder="What's the title ?" />
            </div>
          </div>

          <div className="col-4">
            <div className="d-flex flex-column ">
              <p className="mb-0 input_label">Subject :</p>
              <select className="" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          <div className="col-3">
            <div className="d-flex flex-column ">
              <p className="mb-0 input_label">Week :</p>
              <select className="" aria-label="Default select example">
                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-12">
            <div className="">
              <p className="input_label mb-0">Description :</p>
              <div className="description_div">
                <input
                  type="text"
                  placeholder="Write Your Material Description "
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row my-4">
          <div className="col-12">
            <div className="">
              <p className="file_label mb-0">File :</p>
              <div className="file_div">
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

        <div className="row my-4">
          <div className="col-6">
            <div className="w-100">
              <p className="file_label mb-0">Link :</p>
              <input type="text" placeholder="Your Link" />
            </div>
          </div>
          <div className="col-6">
            <div className="w-100">
              <p className="file_label mb-0">Description :</p>
              <input type="text" placeholder="Your Link" />
            </div>
          </div>
          <p className="my-3">
            *PRO TIP : you can add a link if you are Summarizes the lecturers on
            YouTube or any other platform.
          </p>
          <hr />
        </div>

        <div className="div d-flex align-items-center gap-3 justify-content-end mb-5">
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
