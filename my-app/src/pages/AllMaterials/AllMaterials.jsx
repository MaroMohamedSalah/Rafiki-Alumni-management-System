import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
  Rating,
} from "@mui/material";
import style from "./AllMaterials.module.css";

import RateStars from "../../components/RateStars";
import axios from "axios";

export default function AllMaterials() {
  const [materials, setMaterials] = useState([]);
  const sessionId = localStorage.getItem("sessionId");

  function getAllMaterials() {
    axios
      .get(`http://localhost:3008/api/materials/`, {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      })
      .then((res) => {
        console.log(res);
        setMaterials(res.data.materials);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    getAllMaterials();
  }, []);

  return (
    <div className="container w-75">
      <div className="searchBar">
        <div className="input-group mb-4 w-50 mt-3">
          <span className={style.searchBg + " input-group-text p-2"}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
          <input
            type="text"
            className={style.searchBg + " form-control"}
            placeholder="search by subject, week number, department"
          />
          <Button
            className={style.editBtn + " input-group-text"}
            variant="contained"
          >
            Search
          </Button>
        </div>
      </div>
      <div className={style.filterBar + " d-flex align-items-center mb-4"}>
        <div className={style.filterSymbol + " d-flex align-items-center"}>
          <i className="fa-solid fa-filter me-2"></i>
          <span>Filter by:</span>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Show All"
            className="ms-2"
          />
        </div>
        <div className="d-flex me-5 pe-5">
          <FormControl
            variant="outlined"
            style={{ minWidth: 100 }}
            className="justify-content-center"
          >
            <InputLabel>Date</InputLabel>
            <Select label="Date" className="rounded-3">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className="mx-2"
            style={{ minWidth: 100 }}
          >
            <InputLabel>Week</InputLabel>
            <Select label="Week" className="rounded-3">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Week 1</MenuItem>
              <MenuItem value={2}>Week 2</MenuItem>
              <MenuItem value={3}>Week 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className="mx-2"
            style={{ minWidth: 100 }}
          >
            <InputLabel>Major</InputLabel>
            <Select label="Major" className="rounded-3">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Major 1</MenuItem>
              <MenuItem value={2}>Major 2</MenuItem>
              <MenuItem value={3}>Major 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            className="mx-2 me-5"
            style={{ minWidth: 100 }}
          >
            <InputLabel>Rate</InputLabel>
            <Select label="Rate" className="rounded-3">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Rate 1</MenuItem>
              <MenuItem value={2}>Rate 2</MenuItem>
              <MenuItem value={3}>Rate 3</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" className={style.editBtn + " ms-5"}>
          <i className="fa-solid fa-plus me-2"></i>Add Material
        </Button>
      </div>
      {materials.map((material, idx) => (
        <div className={style.mainDiv}>
          <div
            className={
              style.editBtn + " row justify-content-between rounded-4 mb-2"
            }
          >
            <div className="col-md-4">
              <div className="row p-3">
                <div className="col-md-3">
                  <div className={style.editImg}>
                    {/* <img
                      src={material.uploader.Img ? material.uploader.Img : img}
                      alt="user img"
                      className="w-100"
                    /> */}
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <span className="fw-bold text-white fs-5">
                      {material.course.courseName}
                    </span>
                    <span className="text-white">
                      By : {material.uploader.UserName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <div className="d-flex justify-content-between align-items-center">
                  <span className={style.timeText + " mt-2 mb-1"}>
                    {formatDate(material.uploadDate)}
                  </span>
                  <i className="fa-solid fa-ellipsis-vertical text-white"></i>
                </div>
                <div>
                  <RateStars
                    value={material.rating ? material.rating : 4}
                    size={"small"}
                  />
                  <span className={style.reviewText + " ms-2"}>
                    {material.rating ? material.rating : "4"}.5 of 5 (
                    {material.views ? material.views : "8"} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
