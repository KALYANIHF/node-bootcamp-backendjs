const asyncHandler = require("../middleware/asyncHandler");
const Bootcamp = require("../models/BootCamp");
const getGeoCoding = require("../utils/geocoder");
const ErrorResponse = require("../utils/errorResponse");

exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let queryStr = JSON.stringify(req.query);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );
  const removeFields = ["select", "sort", "page", "limit"];
  removeFields.forEach((field) => delete req.query[field]);
  // create query string
  if (req.query.select) {
    let fields = req.query.select.split(",").join(" ");
    var query = Bootcamp.find();
    query = query.select(fields);
  } else {
    var query = Bootcamp.find(JSON.parse(queryStr));
  }
  // get all the bootcamps
  const bootcamps = await query;
  if (!bootcamps) {
    return next(new ErrorResponse("Resouces are not found", 404));
  } else {
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  }
});
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const singleBootcamp = await Bootcamp.findById(req.params.id);
  if (!singleBootcamp) {
    return next(new ErrorResponse("Resouce not found", 404));
  }
  res.status(200).json({
    success: true,
    data: singleBootcamp,
  });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const response = await Bootcamp.create(req.body);
  if (!response) {
    return next(new ErrorResponse("Resouce can not be created", 404));
  } else {
    res.status(201).json({
      success: true,
      data: response,
    });
  }
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
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
});

exports.updateBootcampPart = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    msg: `only Update bootcamp name with id ${req.params.id}`,
  });
});

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
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
});

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { distance, address } = req.params;
  const location = await getGeoCoding(address);
  console.log(location);
  const radius = distance / 3960;
  const { lat, lon } = location.results[0];

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [[lat, lon], radius] } },
  });
  if (!bootcamps || bootcamps.length === 0) {
    return next(new ErrorResponse("Resouce not found", 404));
  }
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
