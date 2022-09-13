const Mongoose = require("mongoose");

const boardSchema = new Mongoose.Schema(
  {
    name: { type: String },
    desc: { type: String },
    cards: { type: Object },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("boardSchema", boardSchema);
