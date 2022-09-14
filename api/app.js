const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const path = require("path");

//
config();
loaders();

const app = express();
// use
app.use("/uploads", express.static(path.join(__dirname, "/", "uploads")));
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(fileUpload());
app.use(cors());

const boardRoute = require("./routes/board");
const listRoute = require("./routes/list");
const cardRoute = require("./routes/card");

// routes
app.use("/api/board", boardRoute);
app.use("/api/list", listRoute);
app.use("/api/card", cardRoute);

// mongoose
app.listen(process.env.APP_PORT, () => {
  console.log(`'MongoDB' ${process.env.APP_PORT} listening.`);
});
