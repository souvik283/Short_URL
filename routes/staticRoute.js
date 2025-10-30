const express = require("express")
const URL = require("../models/url")
const {restrictTo} = require("../middlewares/auth")

const router = express.Router()

router.get("/url/admin",restrictTo(["ADMIN"]) ,async(req, res)=>{
    // if (!req.user) {
    //     return res.render("login")
    // }
    const userUrls = await URL.find({})
    return res.render("index", {urls: userUrls})
})

router.get("/",restrictTo(["NORMAL", "ADMIN"]) ,async(req, res)=>{
    // if (!req.user) {
    //     return res.render("login")
    // }
    const userUrls = await URL.find({createdBy: req.user._id})
    return res.render("index", {urls: userUrls})
})

router.get("/signup", (req, res) =>{
    return res.render("signup")
})

router.get("/login", (req, res) =>{
    return res.render("login")
})

module.exports = router