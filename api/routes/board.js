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

// createBoard
router.post(
  "/createBoard",
  validate(schemas.createBoardValidation),
  createBoard
);

// getAllBoard
router.get("/getAllBoard", getAllBoard);

// updateBoardById
router.patch(
  "/updateBoardById/:id",
  validate(schemas.updateBoardValidation),
  updateBoard
);

// deleteBoardById
router.delete("/deleteBoardById/:id", deleteBoard);

module.exports = router;
