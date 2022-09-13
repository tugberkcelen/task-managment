const Mongoose = require("mongoose");

const listSchema = new Mongoose.Schema(
  {
    name: "",
    desc: "",
    idBoard: "",
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("listSchema", listSchema);
