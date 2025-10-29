const { getUser } = require("../services/auth")


function authorizedUserOnly(req, res, next) {
    const token = req.cookies?.uid

    if (!token) {
        return next()
    }
    const user = getUser(token)
    req.user = user
    return next()
}

function restrictTo(roles= []) {
    return function(req, res, next){

        if(!req.user){
             return res.redirect("/login")
        }
        // console.log(req.user.role, roles)
        if (!roles.includes(req.user.role)) {
            return res.end("UnAuthorized")
        }
        return next()
    }
    
}

module.exports = {authorizedUserOnly, restrictTo}

// async function restrictToUserOnly(req, res, next) {
//     // const token = req.cookies?.uid
//     const fulltoken = req.headers["authorization"]
//     const token = fulltoken.split("Bearer ")[1]
//     // console.log(token)

//     if (!token) {
//         return res.render("login")
//     }
//     const user = getUser(token)

//     if (!user) {
//         return res.render("login")
//     }
//     req.user = user
//     next()
// }
// async function CheckAuth(req, res, next) {
//     // const token = req.cookies?.uid
//     const fulltoken = req.headers["authorization"]
//     const token = fulltoken.split("Bearer ")[1]
//         // console.log(token)
//     const user = getUser(token)
//     req.user = user
//     next()
// }
// module.exports = { restrictToUserOnly, CheckAuth }