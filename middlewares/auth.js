const { getUser } = require("../services/auth")

async function restrictToUserOnly(req, res, next) {
    const token = req.cookies?.uid
    if (!token) {
        return res.render("login")
    }
    const user = getUser(token)

    if (!user) {
        return res.render("login")
    }
    req.user = user
    next()
}
async function CheckAuth(req, res, next) {
        const token = req.cookies?.uid
    const user = getUser(token)
    req.user = user
    next()
}
module.exports = { restrictToUserOnly , CheckAuth}