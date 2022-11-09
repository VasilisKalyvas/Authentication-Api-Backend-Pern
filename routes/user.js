const express = require("express");
const { borrowBook, deleteborrow, returnBook } = require("../controllers/user.js");
const authorize = require("../middleware/authorize");
const adminVerify = require("../middleware/adminVerify");
const router = express.Router();

router.post("/borrow", authorize, borrowBook)
router.delete("/Borrowdelete/:id", adminVerify, authorize, deleteborrow)
router.delete("/returnBook/:id", authorize, returnBook)
module.exports = router