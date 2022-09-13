const express = require("express");
const router = express.Router();
const { createBoard, getBoards } = require("../controllers/board");

console.log("test");

// createBoard
router.post("/createBoard", createBoard);

// getBoards
router.get("/getBoard", getBoards);

module.exports = router;
