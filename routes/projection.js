const express = require("express");
const authorize = require("../middleware/authorize");
const adminVerify = require("../middleware/adminVerify");
const { getAllProjections, 
        getProjection, 
        createProjection 
      } = require("../controllers/projection.js");
const router = express.Router();

router.get("/all", authorize, adminVerify, getAllProjections)
router.get("/:id", authorize, adminVerify, getProjection)
router.post("/", authorize, adminVerify, createProjection)

module.exports = router