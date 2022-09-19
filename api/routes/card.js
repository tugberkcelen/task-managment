const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/cardValidation");
const router = express.Router();
const {
  createCard,
  getAllCard,
  updateCard,
  deleteCard,
  getSingleCardByIdBoard,
} = require("../controllers/card");

// createCard
router.post("/createCard", validate(schemas.createCardValidation), createCard);

// getAllCard
router.get("/getAllCard", getAllCard);

// updateCardById
router.patch("/updateCardById/:id", updateCard);

// deleteCard
router.delete("/deleteCardById/:id/idCardTrello/:idCardTrello", deleteCard);

// getSingleCardByIdBoard
router.get("/getSingleCardByIdBoard/:id", getSingleCardByIdBoard);

module.exports = router;
