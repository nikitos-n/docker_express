require('dotenv').config({path: `${__dirname}/.env.local`})

const path = require("path")
const mongoose = require("mongoose")
const express = require("express")
const exphbs = require("express-handlebars")
const homeRoutes = require("./routes/home")
const coursesRoutes = require("./routes/courses")
const addRoutes = require("./routes/add")
const addCard = require("./routes/card")

const app = express()

const PORT = process.env.PORT
const userName = process.env.CHAT_MONGO_USER
const password = process.env.CHAT_MONGO_PASSWORD

async function start() {
    try {
        await mongoose.connect('mongodb://mongo_nikita:27017', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            user: userName,
            pass: password
        })
        app.listen(PORT, () => {
            console.log(`Server is listening on ${PORT} docker port`)
        })
    }
    catch (err) {
        throw new Error(err)
    }
}

start()

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine("hbs", hbs.engine)

app.set("view engine", "hbs")   
app.set("views", "views")


app.use(express.static(path.join(__dirname, "public"))) 
app.use(express.urlencoded({extended: false}))

app.use("/", homeRoutes)
app.use("/courses", coursesRoutes)
app.use("/add", addRoutes)
app.use("/card", addCard)
