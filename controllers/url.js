const URL = require("../models/url")
const { nanoid } = require("nanoid")

async function generateNewUrl(req, res) {
    let body1 = req.body
    let shortID = nanoid(8);
    if (!body1) {
        return res.status(400).json({ msg: "Invalid User Data" })
    }
    await URL.create({
        shortId: shortID,
        redirectUrl: body1.url,
        visitHistory: []
    })
    return res.render("index", { id: shortID })
}

async function redirectToUrl(req, res) {
    let ID = req.params.shortid

    let result = await URL.findOneAndUpdate(
        { shortId: ID },
        {
            $push: {
                visitHistory: {
                    timestamps: `${new Date().getHours()}:${new Date().getMinutes()} Date: ${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`
                }
            },

        })

    return res.redirect(result.redirectUrl)
}

async function totalClicks(req, res) {
    let id = req.params.shortid
    let result = await URL.findOne(
        { shortId: id }
    )
    return res.json(
        {
            TotalClicls: result.visitHistory.length,
            clicksTime: result.visitHistory
        }
    )
}

module.exports = { generateNewUrl, redirectToUrl, totalClicks }