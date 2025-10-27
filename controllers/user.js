const user = require("../models/user")

async function userSignup(req, res) {
    const {fullname, email, password} = req.body
    if (!email||!fullname||!password) {
        return res.status(400).json({ msg: "Invalid User Data" })
    }
    await user.create({
      fullname,
      email,
      password  
    })

    return res.redirect("/")
}

async function userLogin(req, res) {
    const {email, password} = req.body
    if (!email||!fullname||!password) {
        return res.status(400).json({ msg: "Invalid User Data" })
    }

    let user =await user.findOne({email: email, password: password})

    if (!user) {
      return res.render("login", {
        error: "Invalid email or password"
      })
    }
    return res.redirect("/")
}


module.exports = {userSignup, userLogin}