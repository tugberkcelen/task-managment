const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./config");
const loaders = require("./loaders");
const app = express();

//
config();
loaders();

// use
app.use(express.json({ limit: "50mb" }));
app.use(helmet());
app.use(cors());

const boardRoute = require("./routes/board");
const listRoute = require("./routes/list");

// routes
app.use("/api/board", boardRoute);
app.use("/api/list", listRoute);

// mongoose
app.listen(process.env.APP_PORT, () => {
  console.log(`'MongoDB' ${process.env.APP_PORT} listening.`);
});
