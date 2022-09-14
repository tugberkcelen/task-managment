const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/cardValidation");
const router = express.Router();
const {
  createCard,
  getAllCard,
  updateCard,
  deleteCard,
} = require("../controllers/card");

// createCard
router.post("/createCard", createCard);

// getAllCard
router.get("/getAllCard", getAllCard);

// updateCardById
router.patch("/updateCardById/:id", updateCard);

// deleteCard
router.delete("/deleteCardById/:id", deleteCard);

module.exports = router;
