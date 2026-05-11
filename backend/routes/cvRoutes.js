const express = require("express");
const router = express.Router();
const {
  createCvController,
  getCvController,
} = require("../controllers/cvController");

//============================
// CREATE ROUTE
//============================

router.post("/create", createCvController);

//============================
// GET CV ROUTE
//============================

router.get("/:userId", getCvController);

module.exports = router;
