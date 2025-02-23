const mongoose = require("mongoose");
const getGeoCoding = require("../utils/geocoder");
const nodegeoCoder = require("node-geocoder");
const slugify = require("slugify");
const BootCampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  location: Object,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 500 characters"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid URL with HTTP or HTTPS",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone number can not be longer than 20 characters"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
    cation: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
  },
  careers: {
    // Array of strings
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [10, "Rating must can not be more than 10"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avgCost: Number,
});

// GEOCODE & CREATE LOCATION FIELD
BootCampSchema.pre("save", async function (next) {
  const geoaddress = await getGeoCoding(this.address);
  // console.log(geoaddress.results[0].formatted);
  this.location = {
    type: "Point",
    coordinates: [geoaddress.results[0].lon, geoaddress.results[0].lat],
    formattedAddress: geoaddress.results[0].formatted,
    street: geoaddress.results[0].street,
    city: geoaddress.results[0].city,
    state: geoaddress.results[0].state_code,
    zipcode: geoaddress.results[0].postcode,
    country: geoaddress.results[0].country_code,
  };
  // console.log(this.location);
  this.address = undefined;
  next();
});

module.exports = mongoose.model("Bootcamp", BootCampSchema);
