const express = require("express");
const router = require("./routes/route");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/bootcamps", router);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
