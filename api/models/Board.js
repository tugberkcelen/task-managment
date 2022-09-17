const Mongoose = require("mongoose");

const boardSchema = new Mongoose.Schema(
  {
    name: { type: String },
    desc: { type: String },
    cards: { type: Object },
    idBoardTrello: { type: Mongoose.Types.ObjectId },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("boardSchema", boardSchema);
