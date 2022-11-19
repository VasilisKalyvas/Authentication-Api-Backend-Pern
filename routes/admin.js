const express = require("express");
const authorize = require("../middleware/authorize");
const adminVerify = require("../middleware/adminVerify");
const { usersList, singleUser, createUser, updateUser, deleteUser, admin } = require("../controllers/admin.js");
const router = express.Router();

router.get("/users", authorize, adminVerify, usersList)
router.get("/user/:id", authorize, adminVerify, singleUser)
router.post("/user", authorize, adminVerify, createUser)
router.put("/user", authorize, adminVerify, updateUser)
router.delete("/user/:id", authorize, adminVerify, deleteUser)
router.put("/admin/:id", authorize, adminVerify, admin)

module.exports = router