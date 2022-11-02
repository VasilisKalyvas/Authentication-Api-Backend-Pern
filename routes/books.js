const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const adminVerify = require("../middleware/adminVerify");
const { getAllbooks, 
        getbook, 
        getBooksByWritter,
        createbook, 
        updatebook, 
        deletebook,
        sortASCBooksByPublisedYear,
        sortDESCBooksByPublisedYear
       } = require("../controllers/books.js");


router.get("/writter", authorize, getBooksByWritter)
router.get("/all", authorize, getAllbooks)
router.get("/sortascbyyear", authorize, sortASCBooksByPublisedYear)
router.get("/sortdescbyyear", authorize, sortDESCBooksByPublisedYear)
router.get("/:id", authorize, getbook)
router.post("/", adminVerify, authorize, createbook)
router.put("/update/:id", adminVerify, authorize, updatebook)
router.delete("/delete/:id", adminVerify, authorize, deletebook)


module.exports = router