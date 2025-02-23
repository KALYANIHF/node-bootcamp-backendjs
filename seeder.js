const fs = require("fs");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Bootcamp = require("./models/BootCamp");
const Course = require("./models/Course");
// Load env vars
dotenv.config({ path: "./config/.env" });
// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);
// Import into DB

connectDB();
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    await Course.create(courses);
    console.log(`Data Imported...`.green.inverse.bold);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    console.log(`Data Destroyed...`.red.inverse.bold);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
