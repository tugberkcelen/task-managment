const Mongoose = require("mongoose");

const listSchema = new Mongoose.Schema(
  {
    name: { type: String },
    desc: { type: String },
    idBoard: { type: Mongoose.Types.ObjectId },
    idListTrello: { type: Mongoose.Types.ObjectId },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("listSchema", listSchema);
