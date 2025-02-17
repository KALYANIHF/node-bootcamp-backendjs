const express = require("express");
const router = require("./routes/route");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/error");
dotenv.config({ path: "./config/.env" });
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/bootcamps", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
