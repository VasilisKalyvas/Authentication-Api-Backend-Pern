const express = require("express");
const authorize = require("../middleware/authorize");
const { login, signup} = require("../controllers/auth.js");
const router = express.Router();

router.post("/login", login)
router.post("/signup", signup)

module.exports = router