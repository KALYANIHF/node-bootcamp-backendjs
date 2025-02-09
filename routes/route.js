const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  updateBootcampPart,
} = require("../controllers/bootcamps");
router.route("/").get(getBootcamps).post(createBootcamp);
router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .patch(updateBootcampPart)
  .delete(deleteBootcamp);
module.exports = router;
