const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/bordValidation");
const router = express.Router();
const {
  createBoard,
  getAllBoard,
  updateBoard,
  deleteBoard,
} = require("../controllers/board");

console.log("test");

// createBoard
router.post(
  "/createBoard",
  validate(schemas.createBoardValidation),
  createBoard
);

// getBoards
router.get("/getAllBoard", getAllBoard);

// updateBoardById
router.patch(
  "/updateBoardById/:id",
  validate(schemas.updateBoardValidation),
  updateBoard
);

// deleteBoard
router.delete("/deleteBoardById/:id", deleteBoard);

module.exports = router;
