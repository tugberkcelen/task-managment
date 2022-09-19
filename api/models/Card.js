const Mongoose = require("mongoose");

const cardSchema = new Mongoose.Schema(
  {
    name: { type: String },
    desc: { type: String },
    idBoard: { type: Mongoose.Types.ObjectId },
    importance: {
      type: String,
      enum: ["low", "middle", "high"],
      default: "low",
    },
    status: { type: Boolean },
    idList: { type: Mongoose.Types.ObjectId },
    idListTrello: { type: Mongoose.Types.ObjectId },
    idCardTrello: { type: Mongoose.Types.ObjectId },
    image: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = Mongoose.model("cardSchema", cardSchema);
