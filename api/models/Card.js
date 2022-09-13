const Mongoose = require("mongoose");

const cardSchema = new Mongoose.Schema(
  {
    name: "",
    desc: "",
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("cardSchema", cardSchema);
