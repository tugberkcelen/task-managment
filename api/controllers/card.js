const Card = require("../models/Card");
const httpStatus = require("http-status");
const path = require("path");
const {
  createNewCardForTrello,
  deleteCardForTrello,
  updateCardForTrello,
} = require("../trelloServices/services");

// getAllCard
const getAllCard = async (req, res) => {
  const cards = await Card.find({});
  return res.status(httpStatus.OK).json({ cards });
};

// createCard
const createCard = async (req, res) => {
  if (req.files === null) {
    return await createNewCardForTrello(req.body).then((response) => {
      const data = { ...req.body, ...{ idCardTrello: response.data.id } };
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
  } else {
    const fileName =
      Math.floor(Math.random() * 101) * Math.floor(Math.random() * 20) +
      `${req?.files.image.name}`;

    const folderPath = path.join(__dirname, "../", "uploads/cards", fileName);

    const data = { ...req.body, ...{ image: fileName } };

    await createNewCardForTrello(data).then((response) => {
      const newData = { ...data, ...{ idCardTrello: response.data.id } };
      req.files.image.mv(folderPath, (err) => {
        if (err) return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
        const card = new Card(newData);
        card
          .save()
          .then((response) => {
            res.status(httpStatus.OK).json(response);
          })
          .catch((e) => {
            return res.status(httpStatus.BAD_REQUEST).json(e);
          });
      });
    });
  }
};

// getSingleCardByIdBoard
const getSingleCardByIdBoard = async (req, res) => {
  await Card.find({ idBoard: { $in: req.params.id } })
    .then((response) => {
      res.status(httpStatus.CREATED).json(response);
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "something went wrong" });
    });
};

// updateCard
const updateCard = async (req, res) => {
  if (req.files === null) {
    return await updateCardForTrello(req.body).then((response) => {
      console.log("response", response);
      Card.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) => {
          res.status(httpStatus.OK).json(response);
        })
        .catch((e) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: e });
        });
    });
  } else {
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
  }
};

// deleteCard
const deleteCard = async (req, res) => {
  await deleteCardForTrello(req.params.idCardTrello)
    .then((response) => {
      return Card.findByIdAndDelete(req.params.id, { new: true })
        .then((response) => {
          res.status(httpStatus.OK).json(response);
        })
        .catch((e) => {
          res.status(httpStatus.INTERNAL_SERVER_ERROR).json(e);
        });
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
  getSingleCardByIdBoard,
};
