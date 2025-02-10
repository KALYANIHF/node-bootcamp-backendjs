const Bootcamp = require("../models/BootCamps");
const ErrorResponse = require("../utils/errorResponse");

exports.getBootcamps = async (req, res, next) => {
  // get all the bootcamps
  try {
    const bootcamps = await Bootcamp.find();
    if (!bootcamps) {
      return next(new ErrorResponse("Resouces are not found", 404));
    } else {
      res.status(200).json({
        success: true,
        data: bootcamps,
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.getBootcamp = async (req, res, next) => {
  try {
    const singleBootcamp = await Bootcamp.findById(req.params.id);
    if (!singleBootcamp) {
      return next(new ErrorResponse("Resouce not found", 404));
    }
    res.status(200).json({
      success: true,
      data: singleBootcamp,
    });
  } catch (error) {
    next(error);
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const response = await Bootcamp.create(req.body);
    if (!response) {
      return next(new ErrorResponse("Resouce can not be created", 404));
    } else {
      res.status(201).json({
        success: true,
        data: response,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return next(new ErrorResponse("Resource can not be Updated", 404));
    } else {
      return res.status(200).json({
        success: true,
        data: bootcamp,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateBootcampPart = (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `only Update bootcamp name with id ${req.params.id}`,
  });
};

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return next(new ErrorResponse("resouce can not be deleted", 404));
    } else {
      return res.status(200).json({
        success: true,
        data: bootcamp,
        msg: "Bootcamp deleted successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};
