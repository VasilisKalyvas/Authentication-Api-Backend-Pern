const express = require("express");
const { getAllbooks, getbook, getBooksByWritter, createbook, updatebook, deletebook} = 
        require("../controllers/books.js");
const router = express.Router();

router.get("/writter", getBooksByWritter)
router.get("/all", getAllbooks)
router.get("/:id", getbook)
router.post("/", createbook)
router.put("/update/:id", updatebook)
router.delete("/delete/:id", deletebook)


module.exports = router