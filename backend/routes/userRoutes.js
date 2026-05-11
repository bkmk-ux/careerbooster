const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../controllers/userController");
// =======================
// REGISTER ROUTE
// =======================

router.post("/register", registerController);

// =======================
// LOGIN ROUTE
// =======================

router.post("/login", loginController);
module.exports = router;
