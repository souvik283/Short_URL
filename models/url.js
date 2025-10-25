const { Timestamp } = require("bson")
const { timeStamp } = require("console")
const mongoose = require("mongoose")
const { type } = require("os")

const urlschema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [
        {timestamps: {}}
    ]


}, {timestamps: true})

const URL = mongoose.model("url", urlschema)

module.exports = URL