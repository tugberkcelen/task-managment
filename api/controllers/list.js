const List = require("../models/List");
const httpStatus = require("http-status");
const { createListOnBoardForTrello } = require("../trelloServices/services");

// getAllList
const getAllList = async (req, res) => {
  const lists = await List.find({});
  return res.status(httpStatus.OK).json({ lists });
};

// getSingleListByIdboard
const getSingleListByIdboard = async (req, res) => {
  await List.find({ idBoard: { $in: req.params.id } })
    .then((response) => {
      res.status(httpStatus.CREATED).json(response);
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "something went wrong" });
    });
};

// createList
const createList = async (req, res) => {
  console.log("req.body", req.body);
  await createListOnBoardForTrello(req.body)
    .then((response) => {
      const data = { ...req.body, ...{ idListTrello: response.data.id } };
      const list = new List(data);
      list
        .save()
        .then((response) => {
          res.status(httpStatus.CREATED).json(response);
        })
        .catch((e) => {
          return res.status(httpStatus.BAD_REQUEST).json(e);
        });
    })
    .catch((e) => {
      console.log("e", e);
      return res.status(httpStatus.BAD_REQUEST).json(e);
    });
};

// updateList
const updateList = async (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "id is required",
    });
  }
  return List.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "something went wrong" })
    );
};

// deleteList
const deleteList = async (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "id is required",
    });
  }

  return List.findByIdAndDelete(req.params.id, { new: true })
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "something went wrong" });
    });
};

module.exports = {
  getAllList,
  createList,
  updateList,
  deleteList,
  getSingleListByIdboard,
};
