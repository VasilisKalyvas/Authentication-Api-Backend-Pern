const express = require("express");
const { borrowBook, deleteborrow } = require("../controllers/user.js");
const authorize = require("../middleware/authorize");
const adminVerify = require("../middleware/adminVerify");
const router = express.Router();

router.post("/borrow", authorize, borrowBook)
router.delete("/Borrowdelete/:id", adminVerify, authorize, deleteborrow)

module.exports = router