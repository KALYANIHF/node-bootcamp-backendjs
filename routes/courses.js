const express = require("express");
const courses = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

courses.route("/").get(getCourses).post(createCourse);
courses.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);
module.exports = courses;
