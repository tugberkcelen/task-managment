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
  // req.body validate
  const { error, value } = boardValidation.boardSchema.validate(req.body);

  if (error) {
    // error
    const { details } = error;
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: details });
  } else {
    // saving
    const result = new Board(value);
    res.status(httpStatus.CREATED).json({ result });
    return result.save();
  }
};

module.exports = {
  getBoards,
  createBoard,
};
