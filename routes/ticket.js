const express = require("express");
const authorize = require("../middleware/authorize");
const adminVerify = require("../middleware/adminVerify");
const { getAllTickets, 
        getTicket, 
        createTicket } = require("../controllers/ticket.js");
const router = express.Router();

router.get("/all", authorize, adminVerify, getAllTickets)
router.get("/:id", authorize, getTicket)
router.post("/", authorize, createTicket)

module.exports = router