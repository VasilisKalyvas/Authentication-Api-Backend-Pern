const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const adminVerify = require("../middleware/adminVerify");
const { getAllMovies, 
        getMovie,
        createMovie,
        updateMovie, 
        deleteMovie,
       } = require("../controllers/movies.js");


router.get("/all", authorize, getAllMovies)
router.get("/:id", authorize, getMovie)
router.post("/", adminVerify, authorize, createMovie)
router.put("/update/:id", adminVerify, authorize, updateMovie)
router.delete("/delete/:id", adminVerify, authorize, deleteMovie)


module.exports = router