const user = require("../models/user")
const { v4 : uuidv4 } = require("uuid")

const {setUser} = require("../services/auth")

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

    return res.render("login")
}

async function userLogin(req, res) {
    const {email, password}= req.body
  //  console.log(email, password)
    if (!email||!password) {
        return res.status(400).json({ msg: "Invalid User Data" })
    }

    let user2 =await user.findOne({email: email, password: password})

    if (!user2) {
      return res.render("login", {
        error: "Invalid email or password"
      })
    }
    const token = setUser(user2)
    
    res.cookie("uid", token)
    return res.redirect("/")
    
    // return res.json({token})
}


module.exports = {userSignup, userLogin}