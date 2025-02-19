const express = require("express");
const bootcamp = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  updateBootcampPart,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");
bootcamp.route("/").get(getBootcamps).post(createBootcamp);
bootcamp
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .patch(updateBootcampPart)
  .delete(deleteBootcamp);
bootcamp.route("/radius/:address/:distance").get(getBootcampsInRadius);
module.exports = bootcamp;
