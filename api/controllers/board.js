const Board = require("../models/Board");
const Joi = require("joi");
const boardValidation = require("../validations/bordValidation");
const httpStatus = require("http-status");

// getBoards
const getBoards = async (req, res) => {
  const boards = await Board.find({});
  // return data
  return res.status(httpStatus.OK).json({ boards });
};

// createBoard
const createBoard = async (req, res) => {
  const board = new Board(req.body);
  board.save();
  return res.status(httpStatus.CREATED).json(board);
};

// updateBoard
const updateBoard = async (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "id is required",
    });
  }
  return Board.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => {
      res.status(httpStatus.OK).json(response);
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "something went wrong" })
    );
};

module.exports = {
  getBoards,
  createBoard,
  updateBoard,
};
