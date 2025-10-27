const express = require("express")
const path = require("path")
const app = express()
const staticRoute = require("./routes/staticRoute")
const userRoute = require("./routes/user")
const urlRoute = require("./routes/url")
const {connectMongoose} = require("./connect")
// const { use } = require("react")
const port = 4001;

connectMongoose("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

// app.use(express.urlencoded({ extended: false }))
// app.use("/url/test", async (req, res)=>{
//     const allUrls = await URL.find({})
//     return res.render("index", {
//           urls: allUrls,
//         });
// })

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/", staticRoute)
app.use("/user", userRoute)
app.use("/url", urlRoute)

app.listen(port, ()=>{
    console.log(`server started at port: ${port}`)
})