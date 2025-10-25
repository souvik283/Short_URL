const express = require("express")
const router = express.Router()

const {generateNewUrl, redirectToUrl, totalClicks} = require("../controllers/url")

router.post("/", generateNewUrl)

router.get("/:shortid", redirectToUrl)

router.get("/analytics/:shortid", totalClicks)
module.exports = router;