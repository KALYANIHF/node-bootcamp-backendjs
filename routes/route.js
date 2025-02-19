const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  updateBootcampPart,
  getBootcampsInRadius,
} = require("../controllers/bootcamps");
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .patch(updateBootcampPart)
  .delete(deleteBootcamp);
router.route("/radius/:address/:distance").get(getBootcampsInRadius);
module.exports = router;
