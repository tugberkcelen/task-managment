const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/bordValidation");
const router = express.Router();
const { createBoard, getBoards, updateBoard } = require("../controllers/board");

console.log("test");

// createBoard
router.post(
  "/createBoard",
  validate(schemas.createBoardValidation),
  createBoard
);

// getBoards
router.get("/getBoard", getBoards);

// updateBoardById
router.patch(
  "/updateBoardById/:id",
  validate(schemas.updateBoardValidation),
  updateBoard
);

module.exports = router;
