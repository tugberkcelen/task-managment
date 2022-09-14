const Card = require("../models/Card");
const httpStatus = require("http-status");
const path = require("path");

// getAllCard
const getAllCard = async (req, res) => {
  const cards = await Card.find({});
  return res.status(httpStatus.OK).json({ cards });
};

// createCard
const createCard = async (req, res) => {
  const fileName =
    Math.floor(Math.random() * 101) * Math.floor(Math.random() * 20) +
    `${req?.files.image.name}`;

  const folderPath = path.join(__dirname, "../", "uploads/cards", fileName);

  const data = { ...req.body, ...{ image: fileName } };

  req.files.image.mv(folderPath, (err) => {
    if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    const card = new Card(data);
    card
      .save()
      .then((response) => {
        res.status(httpStatus.OK).json(response);
      })
      .catch((e) => {
        return res.status(httpStatus.BAD_REQUEST).json(e);
      });
  });
};

// updateCard
const updateCard = async (req, res) => {
  const fileName =
    Math.floor(Math.random() * 101) * Math.floor(Math.random() * 20) +
    `${req?.files.image.name}`;

  const folderPath = path.join(__dirname, "../", "uploads/cards", fileName);

  const data = { ...req.body, ...{ image: fileName } };

  req.files.image.mv(folderPath, (err) => {
    if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);

    Card.findByIdAndUpdate(req.params.id, data, { new: true })
      .then((response) => {
        res.status(httpStatus.OK).json(response);
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: e });
      });
  });
};

// deleteCard
const deleteCard = async (req, res) => {
  return Card.findByIdAndDelete(req.params.id, { new: true })
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
    });
};

module.exports = {
  getAllCard,
  createCard,
  updateCard,
  deleteCard,
};
