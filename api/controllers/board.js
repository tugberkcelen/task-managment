const Board = require("../models/Board");
const httpStatus = require("http-status");
const { createBoardForTrello } = require("../trelloServices/services");

// getAllBoard
const getAllBoard = async (req, res) => {
  const boards = await Board.find({});
  return res.status(httpStatus.OK).json({ boards });
};

// getSingleBoardById
const getSingleBoardById = async (req, res) => {
  await Board.findById(req.params.id)
    .then((response) => {
      res.status(httpStatus.CREATED).json(response);
    })
    .catch((e) => {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "something went wrong" });
    });
};

// createBoard
const createBoard = async (req, res) => {
  const board = new Board(req.body);
  board
    .save()
    .then((response) => {
      createBoardForTrello(req.body);
      res.status(httpStatus.CREATED).json(response);
    })
    .catch((e) => {
      return res.status(httpStatus.BAD_REQUEST).json(e);
    });
};

// updateBoard
const updateBoard = async (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "id is required",
    });
  }
  return Board.findByIdAndUpdate(req.params.id, req.body)
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "something went wrong" })
    );
};

// deleteBoard
const deleteBoard = async (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "id is required",
    });
  }
  return Board.findByIdAndDelete(req.params.id, { new: true })
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
  getAllBoard,
  createBoard,
  updateBoard,
  deleteBoard,
  getSingleBoardById,
};
