const List = require("../models/List");
const httpStatus = require("http-status");

// getAllList
const getAllList = async (req, res) => {
  const lists = await List.find({});
  return res.status(httpStatus.OK).json({ lists });
};

// createList
const createList = async (req, res) => {
  const list = new List(req.body);
  list
    .save()
    .then((response) => {
      res.status(httpStatus.CREATED).json(response);
    })
    .catch((e) => {
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
};
