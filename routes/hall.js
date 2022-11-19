const express = require("express");
const authorize = require("../middleware/authorize");
const adminVerify = require("../middleware/adminVerify");
const { getAllHalls, 
        getHall, 
        createHall } = require("../controllers/hall.js");
const router = express.Router();

router.get("/all", authorize, adminVerify, getAllHalls)
router.get("/:id", authorize, adminVerify, getHall)
router.post("/", authorize, adminVerify, createHall)

module.exports = router