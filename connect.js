const mongoose = require("mongoose")

async function connectMongoose(url) {
    mongoose
    .connect(url)
    .then(() => { console.log("mongoDB connected")})
    .catch((err)=>{console.log(err)})
}

module.exports = {connectMongoose}