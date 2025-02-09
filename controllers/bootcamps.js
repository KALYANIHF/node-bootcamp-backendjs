const Bootcamp = require("../models/BootCamps");

exports.getBootcamps = async (req, res, next) => {
  // get all the bootcamps
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
exports.getBootcamp = async (req, res, next) => {
  try {
    const singleBootcamp = await Bootcamp.findById(req.params.id);
    if (!singleBootcamp) {
      return res.status(400).json({
        success: false,
        error: "Bootcamp not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: singleBootcamp,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
  res.status(200).json({ success: true, data: singleBootcamp });
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const response = await Bootcamp.create(req.body);
    if (!response) {
      res.status(400).json({
        success: false,
      });
    } else {
      res.status(201).json({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        error: "Bootcamp not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        data: bootcamp,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

exports.updateBootcampPart = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `only Update bootcamp name with id ${req.params.id}`,
  });
};

exports.deleteBootcamp = async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return res.status(400).json({
      success: false,
      error: "Bootcamp not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      data: bootcamp,
      msg: "Bootcamp deleted successfully",
    });
  }
};
