const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/listValidation");
const router = express.Router();
const {
  createList,
  getAllList,
  updateList,
  deleteList,
} = require("../controllers/list");

// createList
router.post("/createList", validate(schemas.createListValidation), createList);

// getAllList
router.get("/getAllList", getAllList);

// updateListById
router.patch(
  "/updateListById/:id",
  validate(schemas.updateListValidation),
  updateList
);

// deleteListById
router.delete("/deleteListById/:id", deleteList);

module.exports = router;
