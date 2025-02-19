const express = require("express");
const course = express.Router();
const {
  getCourses,
  getCourse,
  addCouse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

course.route("/").get(getCourses).post(addCouse);
course.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);
module.exports = course;
